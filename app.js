const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

// Cria a função de extração dos dados
const getData = async () => {
    try {
        console.log('Extraindo os dados...');

        // Deleta o arquivo csv caso ele exista
        fs.unlink('extraction.csv', () => { });

        // Instancia o browser do puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Abre a página no puppeteer e espera até que ela seja completamente carregada
        await page.goto('https://fiis.com.br/lupa-de-fiis/', {
            waitUntil: 'networkidle0',
        });

        // Espera até que a tag com o ID indicado esteja carregada na página
        await page.waitForSelector("#filter--result-table .odd");

        // Seleciona a tabela com a classe indicada
        const html = await page.evaluate(() => {
            return document.querySelector('.dataTables_scrollBody').innerHTML;
        });

        // Instancia o cheerio
        const $ = cheerio.load(html);

        // Percorre os dados da tabela extraída, reorganiza os dados e armazena em uma nova variável
        const result = $("tr").map((i, element) => ({
            ticker: $(element).find('td:nth-of-type(1)').text(),
            targetAudience: $(element).find('td:nth-of-type(2)').text(),
            type: $(element).find('td:nth-of-type(3)').text(),
            administrator: $(element).find('td:nth-of-type(4)').text(),
            lastDividend: $(element).find('td:nth-of-type(5)').text(),
            lastYield: $(element).find('td:nth-of-type(6)').text(),
            price: $(element).find('td:nth-of-type(11)').text(),
            pvpa: $(element).find('td:nth-of-type(12)').text()
        })).get();

        // Fecha o browser do puppeteer
        browser.close();

        // Adiciona o cabeçalho do arquivo csv
        result.unshift({
            ticker: 'Ticker',
            targetAudience: 'Target audience',
            type: 'Type',
            administrator: 'Administrator',
            lastDividend: 'Last dividend',
            lastYield: 'Last dividend yield',
            price: 'Price',
            pvpa: 'Pvpa'
        });

        // Escreve os dados no arquivo csv
        result.map(res => {
            const { ticker, targetAudience, type, administrator, lastDividend, lastYield, price, pvpa } = res;
            const line = `${ticker};${targetAudience};${type};${administrator};${lastDividend};${lastYield};${price};${pvpa}\n`;
            fs.appendFile('extraction.csv', line, () => { });
        });

        console.log('Dados extraídos com sucesso!');

        return result;
    } catch (e) {
        // Em caso de erro, exibe a mensagem abaixo no terminal
        console.log('Ocorreu um erro ao extrair os dados.');
    }
}

// Executa a função acima
getData();
