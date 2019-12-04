$(function() {
   $('input[name="search"]').focus(function() { // input search
      $(this).removeAttr('placeholder')

   }).blur(function() {$(this).attr('placeholder', "Enter ID or URL for channel")})

   $('.c_boxFull .close').click(function () {
      $('.c_boxFull').fadeOut(0)
   })

   $('.search p span:first-of-type').click(function () {
      $('.c_boxFull').fadeIn(0)
   })

   $('.search #random').click(function () {
      $('input[name="search"]').val('https://www.youtube.com/channel/UCf5eV04TeNt8k6hNKAsbgfw/')
   })
})