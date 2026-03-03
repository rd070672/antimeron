# Workstation Set-up手順

作成日：2025/11/17 

  1. sudo apt update
  2. sudo apt upgrade
  3. sudo apt install snapd
  
  4. OneNote install
    a. sudo snap install p3x-onenote

  5. 日本語インストール
    a. System
    b. Rejoin and language
    c. Source +
    d. Japanese 
    e. Log out – in
    
  6. Htopインストール
  8. Vscode install
    a. https://code.visualstudio.com/docs/setup/linux
    b. sudo apt-get install wget gpg
    c. wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
    d. sudo install -D -o root -g root -m 644 microsoft.gpg /usr/share/keyrings/microsoft.gpg
    e. rm -f microsoft.gpg
    f. sudo nano /etc/apt/sources.list.d/vscode.sources
      i. Types: deb
      ii. URIs: https://packages.microsoft.com/repos/code
      iii. Suites: stable
      iv. Components: main
      v. Architectures: amd64,arm64,armhf
      vi. Signed-By: /usr/share/keyrings/microsoft.gpg
    g. 保存：Ctrl + O → Enter → Ctrl + X
    h. sudo apt-get update
    i. sudo apt-get install code
  
  9. Miniconda install
    a. wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh
    b. bash miniconda.sh
    c. Do you accept the license terms? → yes
    d.  Install location:
    e. → そのまま Enter で ~/miniconda3
    f.  Initialize conda? → yes
    g. source ~/.bashrc
    h. conda --version
    i. ベース環境を自動で有効にしたくない場合：
    j. conda config --set auto_activate_base false
    
    k. 環境の作成方法
    l. conda create -n py310 python=3.10
    m. conda activate py310
    n. conda deactivate
    o. echo "$PYTHONPATH"
      i. /opt/intel/oneapi/advisor/2025.4/pythonapi
    p. conda activate base
    q. python --version
      i. Python 3.13.9
    r. python3 --version
      i. Python 3.13.9
    
  
