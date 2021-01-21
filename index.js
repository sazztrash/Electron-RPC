const { app, Tray, Menu, dialog } = require("electron");
const discordrpc = require("discord-rpc");

app.whenReady().then(() => {
  const tray = new Tray("discord.png");
  const menu = Menu.buildFromTemplate([
    { label: "Painel de Administrador", type: "normal", enabled: false },
    {
      label: "ROBUX FREE",
      type: "normal",
      click: () => {
        dialog.showMessageBox({
          title: "ROBUX FREE",
          message: "você não vai ter robux grátis.",
        });
      },
    },
    {
      label: "Sair",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("menu");
  tray.setContextMenu(menu);
});

const clientid = "566752145622302721";

const rpc = new discordrpc.Client({ transport: "ipc" });

function setActivity() {
  rpc.setActivity({
    details: "Entre no nosso servidor!",
    state: "https://discord.gg/Vv7dwFYS",
    largeImageKey: "sieghartlogo",
    largeImageText: "SLEGHART",
  });
}

rpc.on("ready", async () => {
  setActivity();

  setInterval(async () => {
    setActivity();
  }, 15000);
});

rpc.login({ clientId: clientid }).catch((e) => console.error(e));
