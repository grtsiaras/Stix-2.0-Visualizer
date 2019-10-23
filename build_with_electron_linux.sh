git clone https://github.com/electron/electron-quick-start
rm electron-quick-start/index.html
mv electron-quick-start/* .
npm install -D electron-packager
npx electron-packager . Stix2Viz --overwrite --asar --platform=linux --arch=x64 --prune=true --out=release-builds --version-string.CompanyName=UomInfoSec --version-string.FileDescription=1.0 --version-string.ProductName="Stix2Visualization"
cd release-builds/Stix2Viz-linux-x64
echo "\nOpening Stix2Viz now. For later use proceed to the release-builds directory and use 'npm start'."
npm start
