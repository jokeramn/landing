$(".form").submit(e => {
  e.preventDefault();


  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__message");

  modal.removeClass("modal--error");

  [name, phone, comment, to].forEach(field => {
      field.removeClass("form__entry--error");
      if (field.val().trim() == "") {
          field.addClass("form__entry--error");
      }
  })

  const errorField = form.find(".form__entry--error");

  if (errorField.length == 0) {
      $.ajax({
          url: "https://webdev-api.loftschool.com/sendmail",
          method: "post",
          data: {
              name: name.val(),
              phone: phone.val(),
              comment: comment.val(),
              to: to.val(),
          },
          success: data => {
              content.text(data.message)
              $.fancybox.open({
                  src: "#modal",
                  type: "inline"
              })
              $('#form')[0].reset();
          },
          error: data => {
              content.text(data.responseJSON.message);
              $.fancybox.open({
                  src: "#modal",
                  type: "inline"
              })
              modal.addClass("modal--error");
          }
      });
  }
})

$(".app-submit-btn").click(e => {
  e.preventDefault();
  $.fancybox.close();
})

