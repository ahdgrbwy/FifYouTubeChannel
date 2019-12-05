$(function() {
   $('input[name="search"]').focus(function() {
      $(this).removeAttr('placeholder')

   }).blur(function() {$(this).attr('placeholder', "Enter ID or URL for channel")})

   $('.boxFullValid .close').click(function () {
      $('.boxFullValid').fadeOut(0)
   })

   $('.search p span:first-of-type').click(function () {
      $('.boxFullValid').fadeIn(0)
   })

   $('.search #random').click(function () {
      $('input[name="search"]').val('https://www.youtube.com/channel/UCf5eV04TeNt8k6hNKAsbgfw/')
   })

   $('body').on('click', '#history > div', function(){
      $('input[name="search"]').val($(this).find('.who span:last-of-type').text())
   });
})