(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:865786,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

function subscribeUser(email) {
    $('#subscribeUserMessage').remove("");
    if (email == "") {
        $("#emailUser").attr("placeholder", "Please enter your email.");
    } else if (!isEmail(email)) {
        $("#emailUser").val("");
        $("#emailUser").attr("placeholder", "Please enter a valid email.");

    } else {
        $(".pdframe").html("<iframe src='https://go.pardot.com/l/142131/2018-03-26/4yl9799e?email=" + email + "'></iframe>");
        $("#emailUser").val("");
        $("#emailUser").attr("placeholder", "Your email address has been added.");
    }
    return;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function formatDate(date, format) {
    if (!format) {
        return moment(date, "YYYY-MM-DD").format('MMM DD, Y');
    } else {
        return moment(date, "YYYY-MM-DD").format(format);
    }
}

function getUrlVars(url) {
    var vars = {};
    var hashes = url.split("?")[1];
    var hash = hashes.split('&');

    for (var i = 0; i < hash.length; i++) {
        params = hash[i].split("=");
        vars[params[0]] = params[1];
    }
    return vars;
}

/*
 * Following script is adding line numbers to the ballerina code blocks in the gneerated documentation
 */
function initCodeLineNumbers() {
    $('pre > code.ballerina, pre > code.language-ballerina').each(function() {

        if ($(this).parent().find('.line-numbers-wrap').length === 0) {
            //cont the number of rows
            //Remove the new line from the end of the text
            var numberOfLines = $(this).text().replace(/\n$/, "").split(/\r\n|\r|\n/).length;
            var lines = '<div class="line-numbers-wrap">';

            //Iterate all the lines and create div elements with line number
            for (var i = 1; i <= numberOfLines; i++) {
                lines = lines + '<div class="line-number">' + i + '</div>';
            }
            lines = lines + '</div>';
            //calculate <pre> height and set it to the container
            var preHeight = numberOfLines * 18 + 20;

            $(this).parent()
                .addClass('ballerina-pre-wrapper')
                .prepend($(lines));
        }

    });
}

/*
 * Register ballerina language for highlightJS
 * Grammer: https://github.com/ballerina-platform/ballerina-lang/blob/master/compiler/ballerina-lang/src/main/resources/grammar/BallerinaLexer.g4
 */
if (typeof hljs === 'object') {
    hljs.configure({ languages: [] });
    hljs.registerLanguage('ballerina', function() {
        return {
            "k": "if else iterator try catch finally fork join all some while foreach in throw return " +
                "returns break timeout transaction aborted abort committed failed retries next bind with " +
                "lengthof typeof enum import version public private attach as native documentation lock " +
                "from on select group by having order where followed insert into update delete set for " +
                "window query annotation package type typedesc connector function resource service action " +
                "worker struct transformer endpoint object const true false reply create parameter match but",
            "i": {},
            "c": [{
                "cN": "ballerinadoc",
                "b": "/\\*\\*",
                "e": "\\*/",
                "r": 0,
                "c": [{
                    "cN": "ballerinadoctag",
                    "b": "(^|\\s)@[A-Za-z]+"
                }]
            }, {
                "cN": "comment",
                "b": "//",
                "e": "$",
                "c": [{
                    "b": {}
                }, {
                    "cN": "label",
                    "b": "XXX",
                    "e": "$",
                    "eW": true,
                    "r": 0
                }]
            }, {
                "cN": "comment",
                "b": "/\\*",
                "e": "\\*/",
                "c": [{
                    "b": {}
                }, {
                    "cN": "label",
                    "b": "XXX",
                    "e": "$",
                    "eW": true,
                    "r": 0
                }, "self"]
            }, {
                "cN": "string",
                "b": "\"",
                "e": "\"",
                "i": "\\n",
                "c": [{
                    "b": "\\\\[\\s\\S]",
                    "r": 0
                }, {
                    "cN": "constant",
                    "b": "\\\\[abfnrtv]\\|\\\\x[0-9a-fA-F]*\\\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]",
                    "r": 0
                }]
            }, {
                "cN": "number",
                "b": "(\\b(0b[01_]+)|\\b0[xX][a-fA-F0-9_]+|(\\b[\\d_]+(\\.[\\d_]*)?|\\.[\\d_]+)([eE][-+]?\\d+)?)[lLfF]?",
                "r": 0
            }, {
                "cN": "annotation",
                "b": "@[A-Za-z]+"
            }, {
                "cN": "type",
                "b": "\\b(boolean|int|float|string|var|any|datatable|table|blob|map|exception|json|xml|xmlns|error|stream|streamlet|aggregation)\\b",
                "r": 0
            }]
        };
    });
}

$(document).ready(function() {

    var menu = '<div class="container">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
        '<nav class="navbar">' +
        '<div>' +
        '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">' +
        '<span class="sr-only">&#9776</span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '</button>' +
        // '<p class="navbar-brand cTagLine" href="#">Cloud Native Programming Language' +
        '<a class="cMobileLogo" href="." ><img src="/img/cellery-images/cellery-logo.svg" alt="Ballerina"/></a>' +
        '</p>' +
        '</div>' +
        '<div id="navbar" class="collapse navbar-collapse">' +
        '<ul class="nav navbar-nav cTopNav">' +
        '<li class="toctree-l1" id="philosophyli"><a class="cBioTopLink" href="/philosophy">Philosophy</a></li>' +
        '<li class="active toctree-l1" id="learnli"><a class="cBioTopLink" href="/learn">Learn</a></li>' +
        '<li class="toctree-l1" id="openli"><a class="cBioTopLink" href="/community">Community</a></li>' +
        '<li class="toctree-l1" id="helpli"><a class="cBioTopLink" href="/help">Help </a></li>' +
        '<li class="toctree-l1" id="helpli"><a class="cBioTopLink" href="https://blog.ballerina.io">Blog</a></li>' +
        '<li class="toctree-l1"><a class="cSerachIcon" href="#"><img src="/img/search.svg"/></a>' +
        '<div class="cSearchBoxTopMenu">' +
        '<div role="search">' +
        '<form role="form">' +
        '<div class="form-group">' +
        '<input type="text" class="form-control" placeholder="Search..." id="mkdocs-search-query" autocomplete="off">' +
        '</div>' +
        '</form>' +
        '<div id="mkdocs-search-results"></div>' +
        '</div></div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</nav>' +
        '</div>' +
        '</div>';

    var footer = '<div class="container">' +
        '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 cCellery-io-left-col cCelleryFooterLinks">' +
        '<ul>' +
        '<li><a class="cBioFooterLink" href="/downloads">Download</a></li>' +
        '<li><a class="cBioFooterLink" href="https://github.com/ballerina-lang/ballerina/blob/master/LICENSE">Code License</a></li>' +
        '<li><a class="cBioFooterLink" href="/license-of-site">Site License</a></li>' +
        '<li><a class="cBioFooterLink" href="/terms-of-service">TERMS OF SERVICE</a></li>' +
        '<li><a class="cBioFooterLink" href="/privacy-policy">PRIVACY POLICY</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 cCellery-io-middle-col cCelleryFooterSignUp">' +
        '<p><span>Announcement List</span><br/>' +
        '<div class="cFormContainer">' +
        '<form>' +
        '<div class="cFieldContainer">' +
        '<input maxlength="90" value="" id="emailUser" name="email" placeholder="I consent to join the email list" title="email" type="text">' +
        '</div>' +
        '<div class="cButtonContainer">' +
        '<a class="cCelleryButtons subscribeUserForm" href="" id="subscribeUserButton"></a>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '<div class="cSocialmedia">' +
        '<ul>' +
        '<li>' +
        '<a class="cBioFooterLink" href="https://github.com/ballerina-platform" target="_blank"><img src="/img/cellery-images/github.svg"/></a>' +
        '</li>' +
        '<li><a class="cBioFooterLink" href="https://stackoverflow.com/questions/tagged/ballerina" target="_blank"><img src="/img/cellery-images/stackoverflow.svg"/></a></li>' +
        '<li><a class="cBioFooterLink" href="https://twitter.com/ballerinalang" target="_blank"><img src="/img/cellery-images/twitter.svg"/></a></li>' +
        '<li><a class="cBioFooterLink" href="/open-source/slack/"><img src="/img/cellery-images/slack.svg"/></a></li>' +
        '</ul>' +
        '<div class="pdframe"></div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-10 col-md-6 col-lg-6 cCellery-io-right-col">' +
        //'<div class="cFooterBanner"><a href="https://con.ballerina.io/?utm_source=bio&utm_medium=banner&utm_campaign=bio_footer_banner" class="cFooterBanner-link" target="_blank"><img src="https://con.ballerina.io/wp-content/themes/ballerinacon/images/bcon-logo.png"/></a></div>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur</p></div>' +
        '</div>';

    $('#iMainNavigation').append(menu);
    $('#iCelleryFooter').append(footer);

    $("code").addClass('cBasicCode');
    $(".ballerina").removeClass('cBasicCode');
    $(".bash").removeClass('cBasicCode');


    /*
     * Search window toggle function
     */
    var $menuDropWindow = $(".cSearchBoxTopMenu"),
        $searchInput = $('#mkdocs-search-query');

    $(".cSerachIcon").click(function() {
        $menuDropWindow.toggleClass('cShowcSearchTopMenu');
        if ($menuDropWindow.hasClass('cShowcSearchTopMenu')) {
            $searchInput.focus();
        }
    });

    $(document).mouseup(function(e) {
        if ((!$menuDropWindow.is(e.target)) &&
            ($menuDropWindow.has(e.target).length === 0)) {
            $menuDropWindow.removeClass('cShowcSearchTopMenu');
            $searchInput.val('');
            $('#mkdocs-search-results').html('');
        }
    });

    /*
     * subscribe form
     */
    $("#subscribeUserButton").click(function(event) {
        event.preventDefault();
        subscribeUser($(this).val());
    });

    $('#emailUser').on('keypress', function(event) {
        if (event.which === 13) {
            event.preventDefault();
            $(this).attr("disabled", "disabled");
            subscribeUser($(this).val());
            $(this).removeAttr("disabled");
        }
    });

    $(".cCellery-io-packages").click(function() {
//        $(".cCollaps-Menu").toggleClass('cOpenMenu');
//        $(".cCellery-io-packages").toggleClass('cOpenMenu');
//        $(".cCollaps-Menu-first").removeClass('cOpenMenu');
//        $(".cCellery-io-primitive-types").removeClass('cOpenMenu');
//        $(".cCollaps-Menu-second").removeClass('cOpenMenu');
//        $(".cCellery-io-x").removeClass('cOpenMenu');
    });

    $(".cCellery-io-primitive-types").click(function() {
        $(".cCollaps-Menu-first").toggleClass('cOpenMenu');
        $(".cCellery-io-primitive-types").toggleClass('cOpenMenu');
//        $(".cCollaps-Menu").removeClass('cOpenMenu');
//        $(".cCellery-io-packages").removeClass('cOpenMenu');
//        $(".cCollaps-Menu-second").removeClass('cOpenMenu');
//        $(".cCellery-io-x").removeClass('cOpenMenu');
    });

    $(".cCellery-io-x").click(function() {
//        $(".cCollaps-Menu-second").toggleClass('cOpenMenu');
//        $(".cCellery-io-x").toggleClass('cOpenMenu');
//        $(".cCollaps-Menu").removeClass('cOpenMenu');
//        $(".cCellery-io-packages").removeClass('cOpenMenu');
//        $(".cCollaps-Menu-first").removeClass('cOpenMenu');
//        $(".cCellery-io-primitive-types").removeClass('cOpenMenu');
    });

    initCodeLineNumbers();

    $('.cBBE-body').each(function() {
        var lineCount = 0,
            olCount = 1;

        $('.cTR', this).each(function(i, n) {
            var $codeElem = $(n).find('td.code').get(0);
            var lines = $('> td.code', n).text().replace(/\n$/, "").trim().split(/\r\n|\r|\n/);
            var numbers = [];

            $.each(lines, function(i) {
                lineCount += 1;
                numbers.push('<span class="line-number">' + lineCount + '</span>');
            });

            $("<div/>", {
                "class": "bbe-code-line-numbers",
                html: numbers.join("")
            }).prependTo($codeElem);


            if ($('.cCodeDesription > div > ol', this).length > 0) {
                var $elem = $('.cCodeDesription > div > ol', this);
                $($elem).parent().prepend('<span class="ol-number">' + olCount + '.</span>');
                olCount++;
            } else {
                olCount = 1;
            }
        });
    });

    //disable enter key in searchbox
    $('.form-control').on('keypress', function(event) {
        if (event.which === 13) {
            event.preventDefault();
        }
    });



    $('a[href^="http://www.youtube.com/watch?"]').each(function(i, elem) {
        /*
         * Use below example code block in markdown files and replace <your-video-id> with video ID
         * which on youtube URL & <alt-text> with some alternative text for the video
         *
         * <a href="http://www.youtube.com/watch?feature=player_embedded&v=<your-video-id>" target="_blank">
         *     <img src="http://img.youtube.com/vi/<your-video-id>/0.jpg" alt="<alt-text>" width="480" height="360" border="10" />
         * </a>
         */
        var $iframe = $('<iframe width="' + $('img', elem).attr('width') + '" ' +
            'height="' + $('img', elem).attr('height') + '" ' +
            'src="https://www.youtube.com/embed/' + getUrlVars($(elem).attr('href')).v + '" ' +
            'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        $(elem).replaceWith($iframe);
    });

});

$(function() {
    var pathname = window.location.pathname;

    if (pathname.indexOf("learn") != -1) {
        $("#learnli").addClass("cActive");
    } else if (pathname.indexOf("blog") != -1) {
        $("#blogli").addClass("cActive");
    } else if (pathname.indexOf("philosophy") != -1) {
        $("#philosophyli").addClass("cActive");
    } else if (pathname.indexOf("open-source") != -1) {
        $("#openli").addClass("cActive");
    } else if (pathname.indexOf("help") != -1) {
        $("#helpli").addClass("cActive");
    }
});