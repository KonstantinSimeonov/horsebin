'use strict';

$(function () {
    // TODO: expand
    const filetypeMap = {
        'javascript': 'js',
        'haskell': 'hs',
        'csharp': 'cs',
        'markup': 'md',
        'javascript': 'js',
        'actionscript': 'as',
        'ada': 'adb',
        'aspnet': 'aspx',
        'bash': 'sh',
        'batch': 'bat',
        'csharp': 'cs',
        'coffeescript': 'coffee',
        'crystal': 'cr',
        'fsharp': 'fs',
        'jade': 'pug',
        'eiffel': 'e',
        'elixir': 'exs',
        'erlang': 'erl',
        'fortran': 'f95',
        'haxe': 'hx',
        'icon': 'icn',
        'jolie': 'ol',
        'julia': 'jl',
        'kotlin': 'kt',
        'latex': 'tex',
        'livescript': 'ls',
        'lolcode': 'lol',
        'markdown': 'md',
        'matlab': 'm',
        'nsis': 'nsh',
        'objectivec': 'm',
        'ocaml': 'ml',
        'pascal': 'pas',
        'perl': 'pl',
        'powershell': 'ps1',
        'processing': 'pde',
        'prolog': 'pro',
        'protobuf': 'proto',
        'puppet': 'pp',
        'python': 'py',
        'qore': 'qm',
        'ruby': 'rb',
        'rust': 'rs',
        'sass': 'scss',
        'scheme': 'ss',
        'smalltalk': 'st',
        'stylus': 'styl',
        'typescript': 'ts',
        'verilog': 'v',
        'vhdl': 'vhd',
        'xojo': 'xojo_code'
    };

const $fetchBtn = $('#fetch-btn'),
    $container = $('#paste-details');

$fetchBtn.on('click', function () {
    const contents = $container.find('code').text(),
        pasteName = $container.find('.paste-name').text(),
        language = $container
            .find('pre')
            .attr('class')
            .split('-')
            .pop(),
        fileExtension = filetypeMap[language] || language;



    window.URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], { type: 'octet/stream' });

    blob.lastModifiedDate = new Date();
    blob.name = pasteName;

    $fetchBtn.attr('download', pasteName + '.' + fileExtension);
    $fetchBtn.attr('href', window.URL.createObjectURL(blob));
});
});