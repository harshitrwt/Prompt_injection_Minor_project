# PowerShell script to register a Windows Scheduled Task for Qdrant Keepalive
# Runs every 2 days automatically on your Windows machine

$TaskName = "QdrantCloudKeepAlive"
$ScriptPath = Join-Path $PSScriptRoot "qdrant_keepalive.py"
$PythonPath = (Get-Command python).Source

Write-Host "Registering Scheduled Task: $TaskName"
Write-Host "Python Executable: $PythonPath"
Write-Host "Script: $ScriptPath"

$Action = New-ScheduledTaskAction -Execute $PythonPath -Argument "`"$ScriptPath`""
$Trigger = New-ScheduledTaskTrigger -Daily -At 12:00PM -DaysInterval 2
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Pings Qdrant Cloud cluster every 2 days to prevent hibernation" -Force

Write-Host "`n[SUCCESS] Windows Task '$TaskName' has been registered to run every 2 days at 12:00 PM!"
