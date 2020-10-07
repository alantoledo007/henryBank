let fs = require('fs');
const path = require("path");
const basename = path.basename(__dirname);

function layout(html_name, data){
    const file_name = html_name+'.html';
    let html= fs.readFileSync(__dirname+'/'+file_name, 'utf8');    
    console.log(typeof html);
    Object.keys(data).forEach(item => {
        let str = "{"+item+"}";
        var re = new RegExp(str,"g");
        html = html.replace(re, data[item]);
    });

    return html;
}

module.exports = layout;