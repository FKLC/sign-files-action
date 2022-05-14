# Sign Files GitHub Action
With this Action, you can create signatures of files in the target directory just by setting your private key.

## Inputs
| Name         | Description                                                | Required | Default        |
|--------------|------------------------------------------------------------|----------|----------------|
| privateKey   | The private key that will be used to sign the files        | Yes      | `null`         |
| passphrase   | Private key passphrase                                     | No       | `null`         |
| files        | Files to sign. Glob pattern(s)                             | Yes      | `null`         |
| algorithm    | Algorithm used to sign the files                           | No       | `'RSA-SHA256'` |
| extension    | File extension that will be added at the end of file names | No       | `'.sig'`       |
| outputFolder | Target folder to create signature files in                 | No       | `'./'`         |

## Usage Example with All Inputs
```yaml
uses: 'FKLC/sign-files-action@latest'
with:
  privateKey: ${{ secrets.PRIVATE_KEY }}
  passphrase: ${{ secrets.PASSPHRASE }}
  algorithm: 'RSA-SHA256'
  extension: '.sig'
  outputFolder: './'
  files: |
    builds/**
    data/**
```