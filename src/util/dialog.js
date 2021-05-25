import dialogPolyfill from 'dialog-polyfill'

export const createDialog = function (title, msg, btn, dialogId) {
  const subscribeTransferTestDialogInnerHtml = `<form method="dialog">
                                <p class="title">_TITLE_</p>
                                <div>_MSG_</div>
                                <menu class="dialog-menu">
                                  <button class="nes-btn is-primary">_BTN_</button>
                                </menu>
                              </form>`
  createDialogNative(subscribeTransferTestDialogInnerHtml.replace('_TITLE_', title)
    .replace('_MSG_', msg)
    .replace('_BTN_', btn), {
    className: 'nes-dialog',
    id: dialogId
  })
}

export const createDialogNative = (content, options) => {
  options = Object.assign({
    modal: true,
    className: '',
    wrap: false
  }, options)

  const dialog = document.createElement('dialog')
  dialogPolyfill.registerDialog(dialog)

  const dialogContent = options.wrap ? document.createElement('div') : dialog
  if (dialogContent !== dialog) {
    dialog.append(dialogContent)
  }

  if (typeof content === 'string') {
    dialogContent.innerHTML = content
  } else {
    dialogContent.append(content)
  }
  if (options.className) {
    dialog.className = options.className
  }
  if (options.id) {
    dialog.id = options.id
  }

  const holder = Object.assign(document.createElement('div'), { className: '' })
  holder.append(dialog)

  document.body.append(holder)
  return dialog
}
