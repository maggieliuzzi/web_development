$loc = (get-item $pwd).Name
If ($loc -Match "Up2Date") {
    echo "`nStarting MongoDB...`n"
    New-Item -Path '.\db\data' -ItemType Directory
    New-Item -Path '.\db\log' -ItemType Directory
    mongod --dbpath db\data --logpath db\log\log.txt
}
ELSE {
    echo "`nERROR: Run .ps1 from Up2Date using scripts\start_db.ps1 instead.`n"
}