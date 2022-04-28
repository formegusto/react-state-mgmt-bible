# 내가 보려고 만드는 리액트 상태관리 바이블

친구(나의 영원한 Front-End 스승 MK,,)에게 Recoil Library 공부를 추천받았다가 인터넷에 Recoil을 검색했는데, Jotai를 알게되었고, Jotai를 검색했더니 아래와 같은 표를 보았다.

| 패턴   | 상태 관리 라이브러리 |
| ------ | -------------------- |
| Flux   | Redux, Zustand       |
| Proxy  | Mobx, Valtio         |
| Atomic | Jotai, Recoil        |

“흠,, 이거 재미있는 표군,,” 하고 느꼈다. 각자의 다른 관점에서 리액트 상태 관리를 해결하려는 것은 알고 있었지만, 이렇게 패턴으로 나누어서 보니 흥미가 더 더욱 생겨버렸다. 뭐랄까,, 파워 N의 상상력을 동원해서 머릿속에 리액트 상태관리 라이브러리들의 세계관이 그려졌다랄까,,

![Untitled](https://user-images.githubusercontent.com/52296323/165679305-d9cad49c-f28c-40b0-8274-acd49981777a.png)

그래요. 이 표에 보이듯이 저도 Redux를 아주 좋아합니다. 근데 왜 좋아하는지 모르더라구요? 그냥 처음 배울 때 배운거라 익숙해서 좋아하는 느낌이 강하다.

이 바이블은 사용법을 정리하는 것도 있지만, Flux, Proxy, Atomic과 같은 디자인 패턴들의 특징을 우선적으로 확인한 후에 스터디에 들어갈 것 이다. 그리고 각 상태관리 라이브러리들이 어떠한 관점으로 리액트에서의 상태관리를 해결하려했는지 이해하고, 나중에 가서는 아 우리 이번에는 이거 써보죠? 가 아닌 이 라이브러리를 쓰는 정확한 이유까지 말할 수 있는,, 것이 목표지만! 일단 Enjoy 😊
