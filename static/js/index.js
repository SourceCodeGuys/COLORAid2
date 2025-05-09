// Original version with database integration
set1_color = [
    "#ac7773",
    "#ab746d",
    "#aa7468",
    "#ab7366",
    "#a67161",
    "#a5725f",
    "#a4715c",
    "#a47259",
    "#a27355",
    "#a27554",
    "#a37752",
    "#a37951",
    "#a47b4f",
    "#a37b48",
    "#a17e48",
    "#a18148",
    "#9e8449",
    "#998347",
    "#9c8a4c",
    "#9a894c",
    "#958a4c",
    "#8f8c49"
];

set2_color =[
    "#8f8d49",
    "#8f8f56",
    "#8b9058",
    "#89925d",
    "#859461",
    "#829364",
    "#7e9665",
    "#7e9667",
    "#79976b",
    "#76956d",
    "#72996c",
    "#6b9870",
    "#6a9a73",
    "#699a77",
    "#609877",
    "#5a947c",
    "#5b987e",
    "#589681",
    "#599784",
    "#569685",
    "#549988",
    "#559689"
    ];
    
    
    set3_color =[
    "#559689",
    "#53968d",
    "#50988f",
    "#4a9990",
    "#459a94",
    "#499a95",
    "#4e9999",
    "#529a9f",
    "#5598a1",
    "#5597a3",
    "#5997a4",
    "#6294a5",
    "#6895a4",
    "#6893a6",
    "#6b93aa",
    "#6b8da6",
    "#7390ab",
    "#738eac",
    "#758eaa",
    "#798baa",
    "#7b86a4",
    "#8188a6"
    ];

    
    set4_color =[
    "#8188a6",
    "#858aa6",
    "#8988a6",
    "#8b89a5",
    "#9089a4",
    "#9188a2",
    "#9487a2",
    "#9788a1",
    "#98849d",
    "#9a8298",
    "#a08398",
    "#a07c91",
    "#a47e92",
    "#a87e91",
    "#a77c8d",
    "#a97989",
    "#ab7985",
    "#ad767d",
    "#ad7981",
    "#ad767b",
    "#aa7375",
    "#ad7775"
    ];


color_sets = [set1_color, set2_color, set3_color, set4_color];

for (x = 0; x <= 3; x++) {
    var plates = 22;
    var set1 = [];
    for (i = 2; i < plates; i++) {
        set1.push(i);
    }
    set1.sort(function () {
        return .5 - Math.random();
    });

    d = $('#sortable' + x);
    d.empty();

    set1.push(plates);
    set1.unshift(1);

    set1.forEach(function (e) {
        s = "";
        if (e == 1) { s = "static"; }
        if (e == plates) { s = "static"; }
        d.append('<li class="cheat ui-state-default P' + e + ' ' + s + '" id="' + e + '" data-n=' + e + ' style="background-color:' + color_sets[x][e - 1] + '"> ' + e + '</li>');
    });
}

// Enable sortable functionality
$('#sortable0,#sortable1,#sortable2,#sortable3').sortable({
    items: ':not(.static)',
    start: function () {
        $('.static', this).each(function () {
            var $this = $(this);
            $this.data('pos', $this.index());
        });
    },
    change: function () {
        $sortable = $(this);
        $statics = $('.static', this).detach();
        $helper = $('<li></li>').prependTo(this);
        $statics.each(function () {
            var $this = $(this);
            var target = $this.data('pos');
            $this.insertAfter($('li', $sortable).eq(target));
        });
        $helper.remove();
    }
});

score_set = [];
t_score = 0;

$('#checkMe').click(function () {
    score_set = [];
    t_score = 0;
    $('.results').empty();

    // Calculate scores
    b = newCompareArray($("#sortable0").sortable("toArray"), $("#sortable0"));
    c = newCompareArray($("#sortable1").sortable("toArray"), $("#sortable1"));
    d = newCompareArray($("#sortable2").sortable("toArray"), $("#sortable2"));
    e = newCompareArray($("#sortable3").sortable("toArray"), $("#sortable3"));

    grand_total = 0;
    score_set.forEach(function (item) {
        grand_total += item;
    });

    // Calculate classifications
    class_tritan = 0;
    for (x = 0; x < 9; x++) { class_tritan += score_set[x]; }
    for (x = 44; x < 53; x++) { class_tritan += score_set[x]; }

    class_deutan = 0;
    for (x = 10; x < 17; x++) { class_deutan += score_set[x]; }
    for (x = 54; x < 62; x++) { class_deutan += score_set[x]; }

    class_protan = 0;
    for (x = 18; x < 27; x++) { class_protan += score_set[x]; }
    for (x = 62; x < 70; x++) { class_protan += score_set[x]; }

    class_unclas = 0;
    class_unclas += score_set[9];
    class_unclas += score_set[10];
    class_unclas += score_set[53];
    class_unclas += score_set[54];
    for (x = 27; x < 44; x++) { class_unclas += score_set[x]; }
    for (x = 71; x < 88; x++) { class_unclas += score_set[x]; }

    // Reverse the score_set array for chart plotting
    var new_arr = score_set.slice().reverse();

    // Create labels for the chart
    var label1 = [];
    for (var x = new_arr.length; x > 0; x--) {
        label1.push(x);
    }

    // Determine classification based on highest score
    const classification_scores = { tritan: class_tritan, deutan: class_deutan, protan: class_protan };
    const classification = Object.keys(classification_scores).reduce((a, b) => classification_scores[a] > classification_scores[b] ? a : b);

    const resultData = {
        total_score: grand_total,
        classification: classification,
        classification_scores: classification_scores,
        labels: label1,
        results: new_arr
    };

    // Update localStorage with new values for use in result.html
    window.localStorage.setItem('total_error_score', resultData.total_score);
    window.localStorage.setItem('class_result', resultData.classification);
    window.localStorage.setItem('class_tritan', resultData.classification_scores.tritan);
    window.localStorage.setItem('class_protan', resultData.classification_scores.protan);
    window.localStorage.setItem('class_deutan', resultData.classification_scores.deutan);
    window.localStorage.setItem('labels', JSON.stringify(resultData.labels));
    window.localStorage.setItem('results', JSON.stringify(resultData.results));

    // Send results to the backend for saving in Firestore
    fetch('/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location = "result"; // Redirect to the results page
        } else {
            console.error('Failed to save results:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

function newCompareArray(arr1, em) {
    sortable_id = em.attr('id');
    arr1.unshift("1");
    arr1.push("" + (arr1.length + 1));

    score = 0;
    for (i = 0; i < (arr1.length); i++) {
        a_score = 0;
        if (i == 0) {
            a = ~~parseInt(em.find('.P' + (arr1[i])).data('n'));
            b = ~~parseInt(em.find('.P' + (arr1[i + 1])).data('n'));
            a_score += (Math.abs(a - b) - 1);
            score += a_score;
        } else if (i < arr1.length - 1) {
            likod = ~~parseInt(em.find('.P' + (arr1[i - 1])).data('n'));
            ikaw = ~~parseInt(em.find('.P' + (arr1[i])).data('n'));
            tubang = ~~parseInt(em.find('.P' + (arr1[i + 1])).data('n'));
            a_score += (Math.abs(likod - ikaw) + Math.abs(ikaw - tubang)) - 2;
        } else if (i == arr1.length - 1) {
            a = ~~parseInt(em.find('.P' + (arr1[i])).data('n'));
            b = ~~parseInt(em.find('.P' + (arr1[i - 1])).data('n'));
            a_score += (Math.abs(a - b) - 1);
            score += a_score;
        }
        score_set.push(a_score);
    }

    score -= 2; // Correction for fixed block
    $('.results').append(sortable_id + ' Score:' + score + '<br/>');

    return parseInt(score);
}
