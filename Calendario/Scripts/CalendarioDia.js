/*
    conteudo,
    option = {
    }
*/

$.fn.caledario = function (conteudo, option) {
    var element = this;
    var funcoes = {
        refresh: function (listConteudo) {
            getTitulos(element, listConteudo);
            getConteudo(element, listConteudo);
        }
    };
    funcoes.refresh(conteudo);

    return funcoes;
};

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
};
Number.prototype.padLeft = function (quantidade) {
    var str = "" + this;
    var pad = "";
    for (var i = 0; i < quantidade; i++) {
        pad += "0";
    }
    return pad.substring(0, pad.length - str.length) + str;
};
Date.prototype.toShortTime = function () {
    return this.getHours().padLeft(2) + ":" + this.getMinutes().padLeft(2);
};

function getDateJson(date) {
    var f = /\/Date\((\d*)\)\//.exec(date);
    if (f)
        return new Date(+f[1]);

    return date;
}


function addTag(tag, classe, id) {
    return $(tag, {
        id: id,
        class: classe
    });
}

function getTitulos(content, conteudo) {
    var a1 = addTag('<div>', 'divTituloMarg');
    var a2 = addTag('<div>', 'divImagem');
    var im = addTag('<img>', 'imagemSeta');
    im.attr('src', 'http://www.fiatbotta.com.br/wp-content/themes/Fiatbotta/img/seta.png');
    a2.append(im);
    a1.append(a2);

    var a3 = addTag('<div>', 'divTituloMargConteudo', "divTituloHorario");

    [].map.call(conteudo, function (obj) {
        var a4 = addTag('<div>', 'divTitulo');
        var a5 = addTag('<img>');
        a5.attr('src', obj.Imagem);
        a5.css('width', '100px');
        a4.append(a5);
        a3.append(a4);
    });

    a1.append(a3);
    $(content).html(a1);
}

function getConteudo(content, conteudo) {
    var horaInicio = new Date(2000, 1, 1, 0, 0, 0);
    var horaFim = new Date(2000, 1, 2, 0, 0, 0);

    var b1 = addTag('<div>', 'divGeral');
    var bUl1 = addTag('<ul>', 'divHora');

    for (var i = horaInicio; i < horaFim; i = i.addHours(1)) {
        var li = addTag('<li>');
        li.html(i.toShortTime());
        bUl1.append(li);
    }
    b1.append(bUl1);

    var b2 = addTag("<div>", "divConteudo", "divHorarios");

    [].map.call(conteudo, function (sala) {
        horaInicio = new Date(2000, 1, 1, 0, 0, 0);
        horaFim = new Date(2000, 1, 2, 0, 0, 0);

        var ul = addTag('<ul>', 'divAgenda');

        for (var j = horaInicio; j < horaFim; j = j.addHours(1)) {

            var listHoras = [];
            [].map.call(sala.Agenda, function (age) {
                age.Horario = getDateJson(age.Horario);
                if (age.Horario.getHours() == j.getHours()) {
                    listHoras.push({
                        Horario: age.Horario,
                        Descricao: age.Descricao,
                        Professor: age.Professor
                    });
                }
            });
            var li2 = addTag('<li>');
            li2.attr('data-hora', j.getHours());
            [].map.call(listHoras, function (obj) {
                var c = addTag('<div>', 'divAula');
                c.attr('data-min', obj.Horario.getMinutes());
                var c1 = addTag('<div>', 'divAulaImagem');
                c1.html('☻');
                var c2 = addTag('<div>', 'divAulaHorario');
                c2.html(obj.Horario.toShortTime());
                var c3 = addTag('<div>', 'divAulaTexto');
                c3.html(obj.Descricao);
                var c4 = addTag('<div>', 'divAulaProfessor');
                c4.html(obj.Professor);

                c.append(c1);
                c.append(c2);
                c.append(c3);
                c.append(c4);
                li2.append(c);
            });
            ul.append(li2);
        }
        b2.append(ul);
    });

    b1.append(b2);
    $(content).append(b1);
    ajusteMargem();
    $('#divHorarios').scroll(function () {
        $('#divTituloHorario').scrollLeft($('#divHorarios').scrollLeft());
    });
}

function ajusteMargem() {
    $('[data-hora]').each(function () {
        var margem = 0;
        $(this).children('.divAula').each(function () {
            var a2 = $(this).attr('data-min');
            var a3 = a2 * 4;
            var a4 = (a3 - margem) + 'px';
            $(this).css('margin-top', a4);
            margem += (
                parseInt($(this).css('margin-top').replace('px', '')) +
                    parseInt($(this).css('height').replace('px', ''))
            );
        });
    });
}

//$(function() {
//    $(document).on('scroll', '#divHorarios', function() {
//        $('#divTituloHorario').scrollLeft($('#divHorarios').scrollLeft());
//    });
//});