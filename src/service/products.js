const chrome = require('chrome-aws-lambda');

module.exports.save = async () => {
  try {

    let browser = await chrome.puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    });

    const [page] = await browser.pages();
    await page.goto('https://www.aduana.com.br/promo', { waitUntil: 'networkidle0' });

    const list = await page.evaluate(() => {

      const nodeList = document.querySelectorAll('.list-products');

      // Transformar o NodeList em array
      const infoArray = [...nodeList];

      // Extração dos dados do produto por meio de mapeamento
      const products = infoArray.map((div, idx) => {

        // Busca dos NodeList de cada informação, separados para futuros ajustes
        const imageNodeList = div.querySelectorAll('img');
        const titleNodeList = div.querySelectorAll('h3');
        const newValueNodeList = div.querySelectorAll('.price');
        const oldValueNodeList = div.querySelectorAll('.price');

        // Dentro de cada lista para serem mapeados e organizados no retorno
        const imageArray = [...imageNodeList];
        const titleArray = [...titleNodeList];
        const oldValueArray = [...newValueNodeList];
        const newValueArray = [...oldValueNodeList];

        // Como as imagens do magazineluiza são anexados por JS
        // Extrai apenas o source da imagem utilizando REGEX
        const imageList = imageArray.map(({ src }) => ({
          src
        }));

        // Extraído o nome
        const titleList = titleArray.map(element => ({
          title: element.innerHTML
        }));

        // Extraído o old valor do produto
        const valueList = oldValueArray.map(element => {
          const novoNodeList = element.querySelectorAll('del')
          const velhoNodeList = element.querySelectorAll('ins')
          if (novoNodeList.length > 0) {
            const novoValueArray = [...velhoNodeList];
            const velhoValueArray = [...novoNodeList];

            return {
              oldValue: novoValueArray.map(novo => novo.innerHTML),
              newValue: velhoValueArray.map(velho => velho.innerHTML)
            }
          } else {
            return {
              newValue: element.innerHTML.trim(),
              oldValue: ''
            }
          }
        });

        return {
          title: titleList,
          src: imageList,
          value: valueList
        }
      })

      return products
    });

    await browser.close();

    const organizedList = [];

    // Loop para organização da lista de produtos
    for (let index = 0; index < list[0].title.length; index++) {
      organizedList.push({
        "title": list[0].title[index].title,
        "src": list[0].src[index].src,
        "oldValue": list[0].value[index].oldValue[0],
        "newValue": list[0].value[index].newValue[0]
      })
      
    }

    return organizedList
  } catch (error) {
    console.error(error)
  }

}