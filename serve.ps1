# Servidor local do Ágora (sem instalar nada).
# Uso: clique com o botão direito > "Executar com PowerShell"
#      ou: powershell -ExecutionPolicy Bypass -File .\serve.ps1
#
# Além dos arquivos do app, este servidor oferece a API do Círculo:
#   GET  /api/community/health
#   GET  /api/community/posts
#   POST /api/community/posts
#   POST /api/community/posts/{id}/comments
#   POST /api/community/posts/{id}/react
#   POST /api/community/posts/{id}/report
#   DELETE /api/community/posts/{id}
#   POST /api/community/presence
#
# Os posts ficam em community-data.json, na mesma pasta.
# Proteja esse arquivo: ele contém desabafos de quem usar o Círculo.

param(
    [int]$Port = 8090,
    [switch]$NoBrowser
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$script:dataFile = Join-Path $root 'community-data.json'
$script:rootFull = [System.IO.Path]::GetFullPath($root).TrimEnd('\') + '\'

$mime = @{
    '.html'        = 'text/html; charset=utf-8'
    '.css'         = 'text/css; charset=utf-8'
    '.js'          = 'application/javascript; charset=utf-8'
    '.json'        = 'application/json; charset=utf-8'
    '.webmanifest' = 'application/manifest+json; charset=utf-8'
    '.png'         = 'image/png'
    '.jpg'         = 'image/jpeg'
    '.jpeg'        = 'image/jpeg'
    '.svg'         = 'image/svg+xml'
    '.ico'         = 'image/x-icon'
    '.txt'         = 'text/plain; charset=utf-8'
}

$allowedMoods = @('medo', 'ansiedade', 'futuro', 'trabalho', 'dinheiro', 'solidao', 'recomeco', 'acolhimento', 'outro')

$blockedPatterns = @(
    'vou te matar', 'vou te bater', 'vai morrer', 'se mata', 'morre seu', 'morre sua',
    'viado', 'viada', 'bicha', 'traveco', 'retardado', 'retardada',
    'preto imundo', 'macaco imundo', 'volta para a cozinha', 'estupra'
)

$rate = @{}

function Get-NowMs {
    return [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
}

function Get-Today {
    return (Get-Date).ToString('yyyy-MM-dd')
}

function Ensure-Prop($obj, $name, $default) {
    if ($null -eq $obj) { return }
    $prop = $obj.PSObject.Properties[$name]
    if ($null -eq $prop -or $null -eq $prop.Value) {
        Add-Member -InputObject $obj -NotePropertyName $name -NotePropertyValue $default -Force
    }
}

function Test-Blocked($text) {
    $t = ([string]$text).ToLowerInvariant()
    foreach ($p in $blockedPatterns) {
        if ($t.Contains($p)) { return $true }
    }
    return $false
}

function Test-Rate($ip, $key, $max, $seconds) {
    $now = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
    $k = "$ip|$key"
    $arr = @($rate[$k] | Where-Object { $_ -gt ($now - $seconds) })
    if ($arr.Count -ge $max) {
        $rate[$k] = $arr
        return $false
    }
    $arr += $now
    $rate[$k] = $arr
    return $true
}

function New-Data {
    $now = Get-NowMs
    $welcome = [pscustomobject]@{
        id = 'app-welcome'
        ts = $now - 1080000
        author = 'Ágora'
        anonymous = $false
        app = $true
        mood = 'acolhimento'
        text = 'Este é o Círculo. Um lugar para colocar em palavras o que está pesando — sem nome, se preferir. Comece com uma frase simples: “Hoje eu estou com medo de...”. Ninguém aqui precisa ter a resposta.'
        hearts = 0
        meToo = 0
        comments = @()
        reports = 0
        hidden = $false
        heartsBy = @()
        meTooBy = @()
        deleteToken = $null
    }
    $future = [pscustomobject]@{
        id = 'app-future'
        ts = $now - 360000
        author = 'Ágora'
        anonymous = $false
        app = $true
        mood = 'futuro'
        text = 'Tem uma entrevista, uma conversa, um resultado vindo por aí? Você não precisa viver o dia de amanhã hoje. Se quiser, escreva o que está temendo. Talvez alguém aqui já tenha atravessado algo parecido.'
        hearts = 0
        meToo = 0
        comments = @()
        reports = 0
        hidden = $false
        heartsBy = @()
        meTooBy = @()
        deleteToken = $null
    }
    return [pscustomobject]@{
        version = 1
        posts = @($welcome, $future)
        presence = [pscustomobject]@{ date = (Get-Today); devices = @() }
    }
}

function Save-Data($data) {
    $data.posts = @($data.posts)
    foreach ($p in $data.posts) {
        Ensure-Prop $p 'comments' @()
        Ensure-Prop $p 'heartsBy' @()
        Ensure-Prop $p 'meTooBy' @()
        $p.comments = @($p.comments)
        $p.heartsBy = @($p.heartsBy)
        $p.meTooBy = @($p.meTooBy)
    }
    $json = $data | ConvertTo-Json -Depth 12
    $tmp = "$script:dataFile.tmp"
    [System.IO.File]::WriteAllText($tmp, $json, (New-Object System.Text.UTF8Encoding($false)))
    Move-Item -LiteralPath $tmp -Destination $script:dataFile -Force
}

function Read-Data {
    if (-not (Test-Path -LiteralPath $script:dataFile)) {
        $d = New-Data
        Save-Data $d
        return $d
    }
    try {
        $raw = [System.IO.File]::ReadAllText($script:dataFile, [System.Text.Encoding]::UTF8)
        if ([string]::IsNullOrWhiteSpace($raw)) {
            $d = New-Data
            Save-Data $d
            return $d
        }
        $data = $raw | ConvertFrom-Json
        Ensure-Prop $data 'posts' @()
        $data.posts = @($data.posts)
        foreach ($p in $data.posts) {
            Ensure-Prop $p 'id' $null
            Ensure-Prop $p 'ts' (Get-NowMs)
            Ensure-Prop $p 'author' $null
            Ensure-Prop $p 'anonymous' $true
            Ensure-Prop $p 'app' $false
            Ensure-Prop $p 'mood' 'acolhimento'
            Ensure-Prop $p 'text' ''
            Ensure-Prop $p 'hearts' 0
            Ensure-Prop $p 'meToo' 0
            Ensure-Prop $p 'comments' @()
            Ensure-Prop $p 'reports' 0
            Ensure-Prop $p 'hidden' $false
            Ensure-Prop $p 'heartsBy' @()
            Ensure-Prop $p 'meTooBy' @()
            Ensure-Prop $p 'deleteToken' $null
            $p.comments = @($p.comments)
            $p.heartsBy = @($p.heartsBy)
            $p.meTooBy = @($p.meTooBy)
            foreach ($c in $p.comments) {
                Ensure-Prop $c 'id' $null
                Ensure-Prop $c 'ts' (Get-NowMs)
                Ensure-Prop $c 'author' $null
                Ensure-Prop $c 'anonymous' $true
                Ensure-Prop $c 'text' ''
                Ensure-Prop $c 'reports' 0
                Ensure-Prop $c 'hidden' $false
            }
        }
        if ($null -eq $data.PSObject.Properties['presence'] -or $null -eq $data.presence) {
            Add-Member -InputObject $data -NotePropertyName presence -NotePropertyValue ([pscustomobject]@{ date = (Get-Today); devices = @() }) -Force
        } else {
            Ensure-Prop $data.presence 'date' (Get-Today)
            Ensure-Prop $data.presence 'devices' @()
            $data.presence.devices = @($data.presence.devices)
        }
        return $data
    }
    catch {
        $d = New-Data
        Save-Data $d
        return $d
    }
}

function Public-Post($p, $device) {
    $anon = $true
    if ($null -ne $p.PSObject.Properties['anonymous']) { $anon = [bool]$p.anonymous }
    $author = $null
    if (-not $anon) { $author = $p.author }

    $comments = @()
    foreach ($c in @($p.comments)) {
        if (-not $c.hidden) {
            $cAnon = $true
            if ($null -ne $c.PSObject.Properties['anonymous']) { $cAnon = [bool]$c.anonymous }
            $comments += [pscustomobject]@{
                id = $c.id
                ts = [long]$c.ts
                author = $(if ($cAnon) { $null } else { $c.author })
                anonymous = $cAnon
                text = $c.text
            }
        }
    }

    return [pscustomobject]@{
        id = $p.id
        ts = [long]$p.ts
        author = $author
        anonymous = $anon
        app = [bool]$p.app
        mood = $p.mood
        text = $p.text
        hearts = [int]$p.hearts
        meToo = [int]$p.meToo
        comments = @($comments)
        reactedHeart = (@($p.heartsBy) -contains $device)
        reactedMeToo = (@($p.meTooBy) -contains $device)
    }
}

function Send-Bytes($stream, $status, $contentType, [byte[]]$bytes, $headOnly) {
    if ($null -eq $bytes) { $bytes = [byte[]]@() }
    $header = "HTTP/1.1 $status`r`n" +
    "Content-Type: $contentType`r`n" +
    "Content-Length: $($bytes.Length)`r`n" +
    "Cache-Control: no-store, max-age=0`r`n" +
    "Connection: close`r`n" +
    "X-Content-Type-Options: nosniff`r`n" +
    "Referrer-Policy: no-referrer`r`n" +
    "Access-Control-Allow-Origin: *`r`n" +
    "Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS`r`n" +
    "Access-Control-Allow-Headers: Content-Type`r`n`r`n"
    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    if (-not $headOnly -and $bytes.Length -gt 0) {
        $stream.Write($bytes, 0, $bytes.Length)
    }
    $stream.Flush()
}

function Send-Json($stream, $status, $obj) {
    $json = $obj | ConvertTo-Json -Depth 12 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    Send-Bytes $stream $status 'application/json; charset=utf-8' $bytes $false
}

function Send-Text($stream, $status, $text) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes([string]$text)
    Send-Bytes $stream $status 'text/plain; charset=utf-8' $bytes $false
}

function Parse-Query($qs) {
    $h = @{}
    if ([string]::IsNullOrWhiteSpace($qs)) { return $h }
    foreach ($pair in $qs.TrimStart('?').Split('&')) {
        if ([string]::IsNullOrWhiteSpace($pair)) { continue }
        $kv = $pair.Split('=', 2)
        $k = [System.Uri]::UnescapeDataString($kv[0])
        $v = if ($kv.Length -gt 1) { [System.Uri]::UnescapeDataString($kv[1]) } else { '' }
        $h[$k] = $v
    }
    return $h
}

function Read-Head($stream) {
    $bytes = New-Object System.Collections.Generic.List[byte]
    while ($bytes.Count -lt 65536) {
        $b = $stream.ReadByte()
        if ($b -lt 0) { break }
        $bytes.Add([byte]$b)
        $n = $bytes.Count
        if ($n -ge 4 -and $bytes[$n - 4] -eq 13 -and $bytes[$n - 3] -eq 10 -and $bytes[$n - 2] -eq 13 -and $bytes[$n - 1] -eq 10) { break }
    }
    return [System.Text.Encoding]::ASCII.GetString($bytes.ToArray())
}

function Read-Body($stream, $length) {
    if ($length -le 0) { return '' }
    $buffer = New-Object byte[] $length
    $read = 0
    while ($read -lt $length) {
        $n = $stream.Read($buffer, $read, $length - $read)
        if ($n -le 0) { break }
        $read += $n
    }
    return [System.Text.Encoding]::UTF8.GetString($buffer, 0, $read)
}

function Convert-Body($bodyText) {
    if ([string]::IsNullOrWhiteSpace($bodyText)) { return $null }
    try { return $bodyText | ConvertFrom-Json } catch { return $null }
}

$url = "http://localhost:$Port/"

try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
    $listener.Start()
}
catch {
    Write-Host "Nao foi possivel abrir a porta $Port. Ela ja esta em uso?" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "  Agora - servidor local" -ForegroundColor Yellow
Write-Host "  Pasta: $root"
Write-Host "  No PC:      $url" -ForegroundColor Cyan
Write-Host "  Circulo:    ${url}api/community/health" -ForegroundColor Cyan
Write-Host ""

$lanIp = $null
try {
    $lanIp = (Get-NetIPAddress -AddressFamily IPv4 |
        Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
        Select-Object -First 1).IPAddress
}
catch { }

if ($lanIp) {
    Write-Host "  No celular (mesmo Wi-Fi): http://${lanIp}:$Port/" -ForegroundColor Cyan
    Write-Host "  Dica: no Chrome do celular, menu > 'Adicionar a tela inicial'." -ForegroundColor DarkGray
}
else {
    Write-Host "  (Nao encontrei o IP da rede local para acesso pelo celular.)" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "  Posts do Circulo: $script:dataFile" -ForegroundColor DarkGray
Write-Host "  Deixe esta janela aberta. Ctrl+C para parar." -ForegroundColor DarkGray
Write-Host ""

if (-not $NoBrowser) { Start-Process $url | Out-Null }

while ($true) {
    $client = $null
    $stream = $null
    try {
        $client = $listener.AcceptTcpClient()
        $client.ReceiveTimeout = 10000
        $client.SendTimeout = 10000
        $stream = $client.GetStream()
        $ip = $client.Client.RemoteEndPoint.Address.ToString()

        $head = Read-Head $stream
        if ([string]::IsNullOrWhiteSpace($head)) { continue }

        $lines = $head -split "`r`n"
        $requestLine = $lines[0]
        $parts = $requestLine -split '\s+'
        if ($parts.Count -lt 2) {
            Send-Text $stream '400 Bad Request' 'Pedido invalido'
            continue
        }

        $method = $parts[0].ToUpperInvariant()
        $target = $parts[1]
        $path = [System.Uri]::UnescapeDataString(($target -split '\?')[0])
        $qs = ''
        if ($target.Contains('?')) { $qs = $target.Substring($target.IndexOf('?') + 1) }

        $headers = @{}
        for ($i = 1; $i -lt $lines.Count; $i++) {
            $line = $lines[$i]
            if ([string]::IsNullOrWhiteSpace($line)) { continue }
            $idx = $line.IndexOf(':')
            if ($idx -gt 0) {
                $headers[$line.Substring(0, $idx).ToLowerInvariant()] = $line.Substring($idx + 1).Trim()
            }
        }

        $contentLength = 0
        if ($headers.ContainsKey('content-length')) {
            [void][int]::TryParse($headers['content-length'], [ref]$contentLength)
        }
        if ($contentLength -gt 2097152) {
            Send-Json $stream '413 Payload Too Large' @{ ok = $false; error = 'Texto grande demais.' }
            continue
        }
        $bodyText = Read-Body $stream $contentLength

        if ($method -eq 'OPTIONS') {
            Send-Bytes $stream '204 No Content' 'text/plain; charset=utf-8' ([byte[]]@()) $false
            continue
        }

        $status = '200 OK'
        $isApi = $path.StartsWith('/api/')

        if ($isApi) {
            $data = Read-Data

            if ($path -eq '/api/community/health' -and $method -eq 'GET') {
                Send-Json $stream '200 OK' @{ ok = $true; service = 'agora-circle'; mode = 'online'; version = 1 }
                continue
            }

            if ($path -eq '/api/community/posts' -and $method -eq 'GET') {
                $query = Parse-Query $qs
                $device = [string]$query['device']
                $limit = 60
                if ($query['limit']) { [void][int]::TryParse([string]$query['limit'], [ref]$limit) }
                $limit = [Math]::Max(1, [Math]::Min(100, $limit))
                $mood = [string]$query['mood']

                $visible = @($data.posts | Where-Object { -not $_.hidden })
                $allComments = 0
                $allHearts = 0
                $allMeToo = 0
                $unanswered = 0
                foreach ($p in $visible) {
                    $cs = @($p.comments | Where-Object { -not $_.hidden })
                    $allComments += $cs.Count
                    $allHearts += [int]$p.hearts
                    $allMeToo += [int]$p.meToo
                    if ($cs.Count -eq 0) { $unanswered++ }
                }

                $filtered = $visible
                if ($mood -and $mood -ne 'todas') {
                    $filtered = @($filtered | Where-Object { $_.mood -eq $mood })
                }
                $filtered = @($filtered | Sort-Object -Property ts -Descending | Select-Object -First $limit)

                $out = @()
                foreach ($p in $filtered) { $out += Public-Post $p $device }
                $presenceCount = 0
                if ($data.presence.date -eq (Get-Today)) { $presenceCount = @($data.presence.devices).Count }

                Send-Json $stream '200 OK' @{
                    ok = $true
                    mode = 'online'
                    posts = @($out)
                    stats = [pscustomobject]@{
                        posts = $visible.Count
                        comments = $allComments
                        hearts = $allHearts
                        meToo = $allMeToo
                        presence = $presenceCount
                        unanswered = $unanswered
                    }
                }
                continue
            }

            if ($path -eq '/api/community/posts' -and $method -eq 'POST') {
                if (-not (Test-Rate $ip 'post' 1 20)) {
                    Send-Json $stream '429 Too Many Requests' @{ ok = $false; error = 'Calma. Espere alguns segundos antes de publicar de novo.' }
                    continue
                }
                $body = Convert-Body $bodyText
                if ($null -eq $body) {
                    Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Não consegui ler o texto enviado.' }
                    continue
                }
                $text = ([string]$body.text).Trim()
                $text = [regex]::Replace($text, '[\x00-\x08\x0B\x0C\x0E-\x1F]', '')
                if ($text.Length -lt 1) {
                    Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Escreva uma frase antes de publicar.' }
                    continue
                }
                if ($text.Length -gt 1200) {
                    Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'O desabafo pode ter até 1200 caracteres.' }
                    continue
                }
                if (Test-Blocked $text) {
                    Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Esse texto não cabe no Círculo. Se foi um engano, tente dizer com outras palavras.' }
                    continue
                }

                $anon = $true
                if ($null -ne $body.anonymous) { $anon = [bool]$body.anonymous }
                $author = $null
                if (-not $anon) {
                    $author = ([string]$body.author).Trim()
                    if ([string]::IsNullOrWhiteSpace($author)) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Escolha um nome ou publique anônimo.' }
                        continue
                    }
                    if ($author.Length -gt 40) { $author = $author.Substring(0, 40) }
                }

                $mood = ([string]$body.mood).Trim()
                if ($allowedMoods -notcontains $mood) { $mood = 'acolhimento' }

                $token = [guid]::NewGuid().ToString('N')
                $post = [pscustomobject]@{
                    id = 'p' + (Get-NowMs).ToString() + '-' + [guid]::NewGuid().ToString('N').Substring(0, 6)
                    ts = Get-NowMs
                    author = $author
                    anonymous = $anon
                    app = $false
                    mood = $mood
                    text = $text
                    hearts = 0
                    meToo = 0
                    comments = @()
                    reports = 0
                    hidden = $false
                    heartsBy = @()
                    meTooBy = @()
                    deleteToken = $token
                }
                $data.posts = @($post) + @($data.posts)
                Save-Data $data
                $device = ([string]$body.device)
                Send-Json $stream '201 Created' @{ ok = $true; post = (Public-Post $post $device); deleteToken = $token }
                continue
            }

            if ($path -eq '/api/community/presence' -and $method -eq 'POST') {
                if (-not (Test-Rate $ip 'presence' 6 60)) {
                    Send-Json $stream '429 Too Many Requests' @{ ok = $false; error = 'Você já deixou seu sinal. Obrigado por estar aqui.' }
                    continue
                }
                $body = Convert-Body $bodyText
                $device = if ($body) { ([string]$body.device).Trim() } else { '' }
                if ($device.Length -lt 4 -or $device.Length -gt 80) {
                    Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Não consegui identificar este aparelho.' }
                    continue
                }
                if ($data.presence.date -ne (Get-Today)) {
                    $data.presence = [pscustomobject]@{ date = (Get-Today); devices = @() }
                }
                $devices = @($data.presence.devices)
                if ($devices -notcontains $device) {
                    $devices += $device
                    $data.presence.devices = @($devices)
                    Save-Data $data
                }
                Send-Json $stream '200 OK' @{ ok = $true; count = @($data.presence.devices).Count }
                continue
            }

            if ($path -match '^/api/community/posts/([A-Za-z0-9_-]+)/(comments|react|report)$' -and $method -eq 'POST') {
                $postId = $matches[1]
                $kind = $matches[2]
                $post = $data.posts | Where-Object { $_.id -eq $postId } | Select-Object -First 1
                if ($null -eq $post) {
                    Send-Json $stream '404 Not Found' @{ ok = $false; error = 'Esse desabafo não está mais aqui.' }
                    continue
                }

                if ($kind -eq 'comments') {
                    if (-not (Test-Rate $ip 'comment' 6 60)) {
                        Send-Json $stream '429 Too Many Requests' @{ ok = $false; error = 'Calma. Espere um pouco antes de responder de novo.' }
                        continue
                    }
                    $body = Convert-Body $bodyText
                    if ($null -eq $body) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Não consegui ler o eco enviado.' }
                        continue
                    }
                    $text = ([string]$body.text).Trim()
                    if ($text.Length -lt 1) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Escreva uma frase antes de enviar.' }
                        continue
                    }
                    if ($text.Length -gt 500) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'O eco pode ter até 500 caracteres.' }
                        continue
                    }
                    if (Test-Blocked $text) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Esse texto não cabe no Círculo. Se foi um engano, tente dizer com outras palavras.' }
                        continue
                    }
                    $anon = $true
                    if ($null -ne $body.anonymous) { $anon = [bool]$body.anonymous }
                    $author = $null
                    if (-not $anon) {
                        $author = ([string]$body.author).Trim()
                        if ([string]::IsNullOrWhiteSpace($author)) {
                            Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Escolha um nome ou responda anônimo.' }
                            continue
                        }
                        if ($author.Length -gt 40) { $author = $author.Substring(0, 40) }
                    }
                    $c = [pscustomobject]@{
                        id = 'c' + (Get-NowMs).ToString() + '-' + [guid]::NewGuid().ToString('N').Substring(0, 6)
                        ts = Get-NowMs
                        author = $author
                        anonymous = $anon
                        text = $text
                        reports = 0
                        hidden = $false
                    }
                    $post.comments = @($post.comments) + $c
                    Save-Data $data
                    $device = ([string]$body.device)
                    Send-Json $stream '201 Created' @{ ok = $true; comment = $c; post = (Public-Post $post $device) }
                    continue
                }

                if ($kind -eq 'react') {
                    if (-not (Test-Rate $ip 'react' 40 60)) {
                        Send-Json $stream '429 Too Many Requests' @{ ok = $false; error = 'Muitos toques seguidos. Espere um pouco.' }
                        continue
                    }
                    $body = Convert-Body $bodyText
                    $type = if ($body) { ([string]$body.type).Trim() } else { '' }
                    $device = if ($body) { ([string]$body.device).Trim() } else { '' }
                    if ($type -ne 'heart' -and $type -ne 'meToo') {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Reação desconhecida.' }
                        continue
                    }
                    if ($device.Length -lt 4 -or $device.Length -gt 80) {
                        Send-Json $stream '400 Bad Request' @{ ok = $false; error = 'Não consegui identificar este aparelho.' }
                        continue
                    }
                    if ($post.hidden) {
                        Send-Json $stream '404 Not Found' @{ ok = $false; error = 'Esse desabafo não está mais aqui.' }
                        continue
                    }
                    if ($type -eq 'heart') {
                        $arr = @($post.heartsBy)
                        if ($arr -notcontains $device) {
                            $arr += $device
                            $post.heartsBy = @($arr)
                            $post.hearts = [int]$post.hearts + 1
                            Save-Data $data
                        }
                    }
                    else {
                        $arr = @($post.meTooBy)
                        if ($arr -notcontains $device) {
                            $arr += $device
                            $post.meTooBy = @($arr)
                            $post.meToo = [int]$post.meToo + 1
                            Save-Data $data
                        }
                    }
                    Send-Json $stream '200 OK' @{ ok = $true; post = (Public-Post $post $device) }
                    continue
                }

                if ($kind -eq 'report') {
                    if (-not (Test-Rate $ip 'report' 6 300)) {
                        Send-Json $stream '429 Too Many Requests' @{ ok = $false; error = 'Já recebemos sua denúncia. Obrigado por cuidar.' }
                        continue
                    }
                    $body = Convert-Body $bodyText
                    $commentId = if ($body) { ([string]$body.commentId).Trim() } else { '' }
                    $hidden = $false
                    if ($commentId) {
                        $comment = @($post.comments) | Where-Object { $_.id -eq $commentId } | Select-Object -First 1
                        if ($comment) {
                            $comment.reports = [int]$comment.reports + 1
                            if ([int]$comment.reports -ge 3) { $comment.hidden = $true }
                            $hidden = [bool]$comment.hidden
                            Save-Data $data
                        }
                    }
                    else {
                        $post.reports = [int]$post.reports + 1
                        if ([int]$post.reports -ge 3) { $post.hidden = $true }
                        $hidden = [bool]$post.hidden
                        Save-Data $data
                    }
                    Send-Json $stream '200 OK' @{ ok = $true; hidden = $hidden }
                    continue
                }
            }

            if ($path -match '^/api/community/posts/([A-Za-z0-9_-]+)$' -and $method -eq 'DELETE') {
                $postId = $matches[1]
                $body = Convert-Body $bodyText
                $token = if ($body) { ([string]$body.token).Trim() } else { '' }
                $post = $data.posts | Where-Object { $_.id -eq $postId } | Select-Object -First 1
                if ($null -eq $post) {
                    Send-Json $stream '404 Not Found' @{ ok = $false; error = 'Esse desabafo não está mais aqui.' }
                    continue
                }
                if ([string]::IsNullOrWhiteSpace($token) -or $token -ne [string]$post.deleteToken) {
                    Send-Json $stream '403 Forbidden' @{ ok = $false; error = 'Você só pode apagar o que publicou neste aparelho.' }
                    continue
                }
                $data.posts = @($data.posts | Where-Object { $_.id -ne $postId })
                Save-Data $data
                Send-Json $stream '200 OK' @{ ok = $true }
                continue
            }

            Send-Json $stream '404 Not Found' @{ ok = $false; error = 'Caminho não encontrado.' }
            continue
        }

        if ($method -ne 'GET' -and $method -ne 'HEAD') {
            Send-Text $stream '405 Method Not Allowed' 'Metodo nao suportado'
            continue
        }

        if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
        $relative = $path.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $full = [System.IO.Path]::GetFullPath((Join-Path $root $relative))

        if (-not $full.StartsWith($script:rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
            Send-Text $stream '403 Forbidden' 'Acesso negado'
            continue
        }

        if (Test-Path -LiteralPath $full -PathType Container) {
            $full = Join-Path $full 'index.html'
        }

        if (Test-Path -LiteralPath $full -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($full)
            $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
            $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
            Send-Bytes $stream '200 OK' $contentType $bytes ($method -eq 'HEAD')
        }
        else {
            Send-Text $stream '404 Not Found' 'Nao encontrado'
        }
    }
    catch {
        # conexao interrompida: segue servindo
    }
    finally {
        if ($client) { try { $client.Close() } catch { } }
    }
}
