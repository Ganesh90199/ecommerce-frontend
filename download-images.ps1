$productsFile = "C:\Users\Ganesha\Downloads\ecommerce\ecommerce-frontend\products.json"
$outputFolder = "C:\Users\Ganesha\Downloads\ecommerce\ecommerce-frontend\public\images\products"

if (!(Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
}

$products = Get-Content $productsFile -Raw | ConvertFrom-Json

foreach ($product in $products) {

    $fileName = $product.name.ToLower()

    $fileName = $fileName -replace '[^a-z0-9]', '-'
    $fileName = $fileName -replace '-+', '-'

    $filePath = Join-Path $outputFolder "$fileName.jpg"

    try {
        Invoke-WebRequest -Uri $product.imageUrl -OutFile $filePath
        Write-Host "Downloaded: $fileName.jpg"
    }
    catch {
        Write-Host "Failed: $($product.name)"
    }
}

Write-Host "All Downloads Completed"