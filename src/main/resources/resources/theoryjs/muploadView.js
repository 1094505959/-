$(function () {
    pageAjax();
})

function viewUpload() {
    if ($("input[name=file]").val() == "") {
        messageShow("请上传文件！");
        return ;
    }
    var formData = new FormData($("form")[0]);
    $.ajax({
        type: "post",
        url: path + "/lbview",
        xhrFields: {
            withCredentials: true,
        },
        data: formData,
        contentType: false, // 使用form的 enctype
        processData: false, // 不对form表单的数据进行处理
        success: function (data) {
            messageShow(data);
            pageAjax();
        }
    });
}

function pageAjax() {
    ajax('get', path + "/lbview",
        {
            'curpage': curpage,
            'cname': $("#cname").val(),
            'term': $("#term").val(),
            'pageNumber': 20
        }).then((data) => {
        joins(data);
    });
}

function joins(data) {
    var tr = "";
    var start = (curpage - 1) * 20;

    for (var i = 0; i < data.length; i++) {
        var json = data[i];
        tr += "<tr>";
        tr += "<td>" + (++start) + "</td>";
        tr += "<td>" + json.vname + "</td>";
        tr += "<td>" + json.cname + "</td>";
        tr += "<td>" + json.term + "</td>";
        var key = json.id;
        tr += '<td><div class="up" onclick="moveU('+ key +')">上移</div><div class="down" onclick="moveD('+ key +')">下移</div><div class="del" onclick="del(' + key + ')">删除</div></td>';
        tr += "</tr>";
    }
    $(".t_div table tr:gt(0)").remove();
    $(".t_div table").append(tr);
    $(".t_div table td").mouseenter(enter);
    $(".t_div table td").mouseleave(leave);
}

function moveU(key) {
    ajax("put", path + "/lbview",{
            'id': key,
            'dir': 'u',
            'term': $("#term").val(),
            'cname': $("#cname").val()
        }).then((data) => {
            messageShow(data);
            pageAjax();
    })
}
function moveD(key) {
    ajax("put", path + "/lbview",{
            'id': key,
            'dir': 'd',
            'term': $("#term").val(),
            'cname': $("#cname").val()
        }).then((data) => {
            messageShow(data);
            pageAjax();
    })
}

function del(key) {
    zdconfirm("系统确认框", "确定删除该记录吗？", function (r) {
        if (r) {
            ajax("delete", path + "/lbview",
                {
                    'id': key
                }).then((data) => {
                    messageShow(data);
                    pageAjax();
            })
        }
    })

}
