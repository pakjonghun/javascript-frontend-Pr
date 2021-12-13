## 요소 안에 래더된 요소를 다 지우려면 parentElement.innerHTML = ""; 로 간단하게
## background css 속성 쓸만하다. 
## ##00000090 이런 방법으로 불투명도 지정 해 줄 수 있다.
## visibility='visible' 쓰면 그자리에 있고 안보인다 opacity :0 을 못쓸때 유용
## 버블이 일어나게 해서 이벤트를 위힘했을때 -> 이벤트가 조건에 따라 안일어나게 할 수 있다.
    - 이벤트를 삭제하거나 반복문을 써서 스타일을 바꾸거나 하지 말자. 위 처럼 쉬운 방법이 있다.

## 타겟돔에서 match method 도 유용하다.(셀렉터 도 이용 가능)
```
if(target.match('.carrot'))console.log('carrot');
```