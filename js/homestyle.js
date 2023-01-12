$(document).ready(function(){
	

	//슬라이드 배너 
	
  // div사이즈 동적으로 구하기

	const outer = document.querySelector('.outer');
	const innerList = document.querySelector('.inner-list');
	const inners = document.querySelectorAll('.inner');
	let currentIndex = 0; // 현재 슬라이드 화면 인덱스

	inners.forEach((inner) => {
	  inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
	})

	innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

	/*
	  버튼에 이벤트 등록하기
	*/
	const buttonLeft = document.querySelector('.button-left');
	const buttonRight = document.querySelector('.button-right');

	buttonLeft.addEventListener('click', () => {
	  currentIndex--;
	  currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
	  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
	  clearInterval(interval); // 기존 동작되던 interval 제거
	  interval = getInterval(); // 새로운 interval 등록
	});

	buttonRight.addEventListener('click', () => {
	  currentIndex++;
	  currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
	  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
	  clearInterval(interval); // 기존 동작되던 interval 제거
	  interval = getInterval(); // 새로운 interval 등록
	});

	/*
	  주기적으로 화면 넘기기
	*/
	const getInterval = () => {
	  return setInterval(() => {
		currentIndex++;
		currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
		innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
	  }, 4000);
	}

let interval = getInterval(); // interval 등록
	
	////////////////////////////////
	//모바일에서 햄버거 아이콘 클릭시 메뉴가 왼쪽에서 나타남 -- 시작
	if( $(window).width()<=680){
		$("header button").click(function(){
				console.log( $(this).attr('class')  );
				if( $(this).attr('class') == 'open' ) {					
					//닫기(X) 보인다					
					$("header button.open").hide();
					$("header button.close").show();
					$("#menu").stop().animate({left:0 });
				} else {
					//햄버거(▤) 보인다					
					$("header button.open").show();
					$("header button.close").hide();
					$("#menu").stop().animate({left:'-100vw' });
					$("#menu nav").stop().slideUp();
					$("#menu li").removeClass('act');
				}
		});	
		
		// 모바일. 메인메뉴 클릭
		$("#menu li>a").click(function(){			
			if( $(this).parent().hasClass('act')){				
				$("#menu li").removeClass('act');
				$(this).parent().removeClass('act');
				$("#menu nav").stop().slideUp();
			}else{				
				$(this).parent().addClass('act');
				$("#menu nav").stop().slideUp();
				$(this).next().stop().slideDown();
			} 
		});
		//모바일. 서브메뉴 클릭시
		$("#menu nav a").click(function(){
				$("header button.open").show();
				$("header button.close").hide();
				$("#menu").stop().animate({left:'-100vw' });
				$("#menu nav").stop().slideUp();
				$("#menu li").removeClass('act');
				
		});		
	}//모바일 메뉴 ----------- 끝
	///////////////////////////////////////////////
	
	//PC화면에서 메뉴 -- 시작
	if( $(window).width() > 680){
		$('#menu a.arr').mouseenter(function(){
			//모든 하위메뉴 올린다.
			$('#menu nav').stop().slideUp();
			//해당 하위메뉴만 내린다.
			$(this).next().stop().slideDown();
		});
		$('#menu').mouseleave(function(){
			$('#menu nav').stop().slideUp();
		});
		
	}//PC 메뉴 ------------- 끝	
	
	
});////////////////끝부분





