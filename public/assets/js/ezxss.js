function request(action, data) {
    data["action"] = action;
    return $.ajax({
        type: "post",
        dataType: "json",
        url: "request",
        data: data
    });
}

$(document).ready(function() {

    $("form.form").submit(function(Form) {
        $("#alert").slideUp();
        Form.preventDefault();
        var inputs = {};
        $("form#" + this.id + " :input").each(function() {
            if (this.id) {
                inputs[this.id] = this.value;
            }
        });
        request(this.id, inputs).then(function(r) {
            if (!r.redirect) {
                $("#alert").html('<div class="alert" role="alert"><p class="close">×</p>' + r.echo + '</div>');
                $("#alert").hide();
                $("#alert").slideDown("slow");
            } else {
                window.location.href = r.redirect;
            }
        });
    });

    $(".delete").click(function() {
      var id = $(this).attr('report-id');
      request("delete-report", {id:id,csrf:csrf}).then(function(r) {
        $("#"+id).fadeOut( "slow", function() {});
      });
    });

    $(".archive").click(function() {
      var id = $(this).attr('report-id');
      var archive = 0;
      if(location.toString().split('/').pop() == 'reports') {
        var archive = 1;
      }
      request("archive-report", {id:id,archive:archive,csrf:csrf}).then(function(r) {
        $("#"+id).fadeOut( "slow", function() {});
      });
    });

    $(".share").click(function() {
      $('#reportid').val( $(this).attr('report-id') );
      $('#shareid').val("https://" + window.location.hostname + "/manage/report/" + $(this).attr('share-id') );
    });

    $('.left-nav-toggle a').on('click', function(event){
        event.preventDefault();
        $("body").toggleClass("nav-toggle");
    });

    $('.nav-second').on('show.bs.collapse', function () {
        $('.nav-second.in').collapse('hide');
    });

    $('.panel-toggle').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        var icon = $(event.target).closest('i');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    $('.panel-close').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        hpanel.remove();
    });
});


$("#alert").on("click", ".close", function() {
    $("#alert").slideUp();
});
