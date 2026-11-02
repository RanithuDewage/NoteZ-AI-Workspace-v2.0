import os
import sys

def create_windows_shortcut():
    study_dir = os.path.dirname(os.path.abspath(__file__))
    pythonw_exe = os.path.join(sys.prefix, "pythonw.exe")
    if not os.path.exists(pythonw_exe):
        pythonw_exe = "pythonw.exe"

    script_path = os.path.join(study_dir, "desktop_app.py")
    icon_path = os.path.join(study_dir, "static", "images", "app_icon.ico")
    shortcut_path = os.path.join(study_dir, "Smart Notes AI.lnk")

    vbs_content = f'''Set oWS = CreateObject("WScript.Shell")
Set oLink = oWS.CreateShortcut("{shortcut_path}")
oLink.TargetPath = "{pythonw_exe}"
oLink.Arguments = "{script_path}"
oLink.WorkingDirectory = "{study_dir}"
oLink.IconLocation = "{icon_path},0"
oLink.Description = "Smart Notes AI Desktop Application"
oLink.Save
'''
    temp_vbs = os.path.join(study_dir, "temp_create_lnk.vbs")
    with open(temp_vbs, "w", encoding="utf-8") as f:
        f.write(vbs_content)

    os.system(f'cscript //nologo "{temp_vbs}"')
    if os.path.exists(temp_vbs):
        os.remove(temp_vbs)
    print(f"Created direct shortcut: {shortcut_path}")

if __name__ == "__main__":
    create_windows_shortcut()
