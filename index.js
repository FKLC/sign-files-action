const fs = require('fs');
const path = require("path");
const glob = require('@actions/glob');
const { createSign } = require('crypto');


const getInput = (name, defVal, required = false) => {
    const val = process.env["INPUT_" + name.toUpperCase()];
    if (required && (val == null || val === '')) {
        throw name + " input must be supplied!";
    }
    return val || defVal;
}

const algorithm = getInput('algorithm', 'RSA-SHA256');
const privateKey = getInput('privateKey', null, true);
const passphrase = getInput('passphrase');
const encoding = getInput('encoding');
const filesPath = getInput('files', null, true);
const extension = getInput('extension', '.sig');
const outputFolder = getInput('outputFolder', 'build/');


const signFile = async (inpFilePath) => {
    const inpFile = fs.createReadStream(inpFilePath);
    const outFilePath = path.join(outputFolder, path.basename(inpFilePath)) + extension;
    const sign = createSign(algorithm);

    await new Promise((resolve) => inpFile.pipe(sign).once('finish', resolve));
    await fs.promises.writeFile(outFilePath, sign.sign({ key: privateKey, passphrase: passphrase }, encoding));
};

(async () => {
    const globber = await glob.create(filesPath, { matchDirectories: false });
    const files = await globber.glob();
    await Promise.all(files.map(filePath => signFile(filePath)));
})();


