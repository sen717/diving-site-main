jQuery(function ($) {
    // この中であればWordpressでも「$」が使用可能になる
    // ハンバーガーメニュー
  $(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-open");
    $(".js-drawer").fadeToggle();
    $("body").toggleClass("active");
  });

    //ドロワーメニュー
  $("#MenuButton").click(function () {
    $(".js-drawer").toggleClass("is-open");
    $(".drawer-menu").toggleClass("is-open");
    $("html").toggleClass("is-fixed");
  });

    // mvスワイパー
  const swiper1 = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

    // campaignスワイパー
  const swiper2 = new Swiper(".js-campaign-swiper", {
    spaceBetween: 24,
    loop: true,
    loopAdditionalSlides: 4,
    loopedSlides: 8,
    width: 280,
    speed: 3000,
    autoplay: {
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    breakpoints: {
      768: {
        spaceBetween: 40,
        width: 333,
      },
    },

    navigation: {
      nextEl: ".js-swiper-button-prev",
      prevEl: ".js-swiper-button-next",
    },
  });

    // ページトップ
  const pageTop = $(".js-page-top");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      // 100pxスクロールしたら発火
      pageTop.fadeIn(); // 100px以上スクロールしたらボタンをフェードイン
    } else {
      pageTop.fadeOut(); // 100px以下になったらボタンをフェードアウト
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500 // 500ミリ秒かけてページトップに戻る
    );
    return false;
  });

  $(document).ready(function () {
    let scrollHeight, scrollPosition, footHeight;
    $("js-page-top").hide();
    $(window).on("scroll", function () {
      scrollHeight = $(document).height();
      scrollPosition = $(window).height() + $(window).scrollTop();
      footHeight = $("footer").innerHeight();

      if (scrollHeight - scrollPosition <= footHeight) {
        $("js-page-top").css({
          position: "absolute",
          bottom: footHeight + 20,
        });
      } else {
        $("js-page-top").css({
          position: "fixed",
          bottom: "20px",
        });
      }
    });

    $("#page-top").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        400
      );
      return false;
    });
  });

  //イメージアニメーション
  // スクロールして表示領域に入ったらclass付与
  $(".js-fadeUp").on("inview", function () {
    $(this).addClass("is-inview");
  });

  //要素の取得とスピードの設定
  var box = $(".js-colorbox"),
    speed = 500;

  //.js-colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  //  アコーディオン
  // クラスが "toggle" に設定された要素を表示する
 // アコーディオン
  $(".faq-item .js-faq-item__content").css("display", "block");
  $(".faq-item .js-faq-item__title").addClass("open");
  $(".js-faq-item__title").on("click", function () {
    $(this).next().slideToggle(200);
    $(this).toggleClass("open", 200);
    $(".js-faq-item__content").on("click", function () {
      $(this).slideUp(200);
      $(".js-faq-item__title").removeClass("open");
    });
  });

  // campaignとvoiceの上部のタブ
  $(document).ready(function () {
    var newsLinks = $(".page-campaign__tab a");
    newsLinks.click(function () {
      // クリックされたタブに.activeクラスを追加し、他のタブからは削除する
      newsLinks.removeClass("active");
      // $(this).addClass("active");
      // // クリックされたタブのdata-filter属性を取得
      // var btnFilter = $(this).attr('data-filter');
      タブに対応するコンテンツを表示するか非表示にする
      if (btnFilter === 'campaign-tab01') {
        $(".page-campaign-cards__card").fadeIn();
      } else {
        $(".page-campaign-cards__card").css('display', 'none');
        $(".page-campaign-cards__card[data-category='" + btnFilter + "']").fadeIn();
      }
    });
  });

  var newsLink = $(".page-voice__tab a");
	var limit = 10;
	$(".voice-cards__item").css('display','none');
	for(var i = 0 ; i < limit ; i++) {
		var limitNews = $(".voice-cards__item")[i];
		$(limitNews).fadeIn();
  }
  $(newsLink).click(function(){
		$(newsLink).removeClass("active");
		$(this).addClass("active");
		var btnFilter = $(this).attr('data-filter');
		if (btnFilter == 'voice-tab01') {
			$(".voice-cards__item").css('display','none');
			for(i = 0 ; i < limit ; i++) {
				limitNews = $(".voice-cards__item")[i];
				$(limitNews).fadeIn();
			}
		} else {
      $(".page-voice-cards__card").css('display','none');
			for(i = 0 ; i < limit ; i++) {
        limitNews = $(".page-voice-cards__card").filter('[data-category = "' + btnFilter + '"]')[i];
				$(limitNews).fadeIn();
			}
		}
  });

  $(".gallery-list__item img").click(function () {
    $("#grayDisplay").html($(this).prop("outerHTML"));
    $("#grayDisplay").fadeIn(200);
    return false;
  });
  $("#grayDisplay").click(function () {
    // 非表示にする
    $("#grayDisplay").fadeOut(200);
    return false;
  });

  // アーカイブアコーディオン
  $(".side-menu__year.js-year").on("click", function () {
    // クリックされた年に関連する月のリストを探し、スライドトグルで表示・非表示を切り替える
    $(this).find(".js-month").slideToggle(200);
    $(this).toggleClass("open");
  });

  // // フッターのリンクがクリックされたときの処理
  // $(".nav__title--sub a").on("click", function () {
  //   // console.log("Clicked!");
  //   var targetHash = $(this).attr("href"); // クリックされたリンクのハッシュを取得
  //   $(".js-tab-menu").removeClass("is-active");
  //   $(".js-tab-content").removeClass("is-active");
  //   $(targetHash).addClass("is-active");
  //   $(".js-tab-menu [href='" + targetHash + "']").addClass("is-active");
  // });






//   // informationの上部のタブ
//   $('.js-tab-menu').on('click', function () {
//     $('.js-tab-menu').removeClass('is-active');
//     $('.js-tab-content').removeClass('is-active');
//     var number = $(this).data("number");
//     $(this).addClass('is-active');
//     var number = $(this).data("number");
//     $('#' + 'tab__menu-' + number).addClass('is-active');
//   });

//   //タブへダイレクトリンクの実装
//     //リンクからハッシュを取得
//     var hash = location.hash;
//     hash = (hash.match(/^#tab__menu-\d+$/) || [])[0];
//     //リンクにハッシュが入っていればtabnameに格納
//     if ($(hash).length) {
//         var tabname = hash.slice(1);
//     } else {
//         var tabname = "tab__menu-1";
//     }
//     //コンテンツ非表示・タブを非アクティブ
//     $(".page-information__tab .js-tab-menu").removeClass("is-active");
//     $(".page-information__tab .js-tab-content ").removeClass("is-active");
//     //何番目のタブかを格納
//     var tabno = $(".page-information__tab .tab__content-item#" + tabname).index();
//     //コンテンツ表示
//     $(".page-information__tab .js-tab-content").eq(tabno).addClass("is-active");
//     //タブのアクティブ化
//     $(".page-information__tab .js-tab-menu").eq(tabno).addClass("is-active");
// });

// campaignとvoiceの上部のタブ
// $(document).ready(function () {
//   var newsLinks = $(".tab-items__item");
//   newsLinks.click(function () {
//     // クリックされたタブに.activeクラスを追加し、他のタブからは削除する
//     newsLinks.removeClass("active");
//     $(this).addClass("active");
//     // クリックされたタブのdata-filter属性を取得
//     var btnFilter = $(this).attr('data-filter');
//     // タブに対応するコンテンツを表示するか非表示にする
//     if (btnFilter === 'campaign-tab01') {
//       $(".page-campaign-cards__card").fadeIn();
//     } else {
//       $(".page-campaign-cards__card").css('display', 'none');
//       $(".page-campaign-cards__card[data-category='" + btnFilter + "']").fadeIn();
//     }
//   });
// });


    // informationの上部のタブ
    $('.js-tab-menu').on('click', function () {
        $('.js-tab-menu').removeClass('is-active');
        $('.js-tab-content').removeClass('is-active');
        var number = $(this).data("number");
        $(this).addClass('is-active');
        $('#' + 'tab__menu-' + number).addClass('is-active');
    });

    // ページ読み込み時とハッシュが変更されたときの処理
    function showTabFromHash() {
        // リンクからハッシュを取得
        var hash = location.hash;
        hash = (hash.match(/^#tab__menu-\d+$/) || [])[0];
        // リンクにハッシュが入っていればtabnameに格納
        if ($(hash).length) {
            var tabname = hash.slice(1);
        } else {
            var tabname = "tab__menu-1";
        }
        // コンテンツ非表示・タブを非アクティブ
        $(".page-information__tab .js-tab-menu").removeClass("is-active");
        $(".page-information__tab .js-tab-content ").removeClass("is-active");
        // 何番目のタブかを格納
        var tabno = $(".page-information__tab .tab__content-item#" + tabname).index();
        // コンテンツ表示
        $(".page-information__tab .js-tab-content").eq(tabno).addClass("is-active");
        // タブのアクティブ化
        $(".page-information__tab .js-tab-menu").eq(tabno).addClass("is-active");
    }

    // ページ読み込み時の処理
    showTabFromHash();

    // ハッシュが変更されたときの処理
    $(window).on('hashchange', function () {
        showTabFromHash();
    });
  });



  // タブメニュー
  const tabButton = $(".js-tab-menu"),
    tabContent = $(".js-tab-content ");
  tabButton.on("click", function (e) {
    e.preventDefault();
    let index = tabButton.index(this);
    // console.log(index);
    tabButton.removeClass("is-active");
    $(this).addClass("is-active");
    tabContent.removeClass("is-active");
    tabContent.eq(index).addClass("is-active");
  });


