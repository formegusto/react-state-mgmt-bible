# 소개

Facebook에서 만든 React를 위한 상태 관리 라이브러리이다. **Recoil은 직교하지만, 본질적인 방향 그래프를 정의하고 React 트리에 붙인다고 한다.** 상태 변화는 이 그래프의 뿌리, atoms라고 부르는 그러한 것으로부터 순수함수, selectors라고 부르는 그러한 것을 거쳐 컴포넌트로 흐르며, 자신들만의 접근방식을 따른다. (,,,?)

**Recoil을 사용하면 atoms(공유 상태)에서 selectors(순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수가 있다.** **Atoms**는 **컴포넌트가 구독할 수 있는 상태의 단위**이며, **Selectors는 atoms 상태값을 동기 또는 비동기 방식을 통해 변환**한다.

## Atoms

Atoms는 상태의 단위로, **업데이트와 구독이 가능**하다. 즉, **렌더링의 대상이 되는 값**을 이야기 한다. atom이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링 된다.

Atoms는 React의 로컬 컴포넌트의 상태 대신 사용할 수 있으며, 동일한 atom이 여러 컴포넌트에서 사용되는 경우, 모든 컴포넌트는 상태를 공유한다.

Atoms는 디버깅, 지속성 및 모든 atoms의 map을 볼 수 있는 특정 **고급 API에 사용되는 고유한 키**가 필요하다. 2개의 atoms가 같은 키를 갖는 것은 허용하지 않는다.

컴포넌트에서 atom을 읽고 쓰려면 **useRecoilState라는 훅을 사용**한다.

## Selectors

Selector는 **atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)**다. 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다.

Selectors는 **상태를 기반으로 하는 파생 데이터를 계산하는 데 사용**된다. 최소한의 상태 집합만 atoms에 저장하고, 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지한다.

**컴포넌트의 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로, 서로 대체**할 수 있다.

Selectors는 selector 함수를 사용해 정의한다. 이 때, get 속성을 정의하는데, 전달되는 get인자를 통해 atoms와 다른 selectors에 접근할 수 있다. **다른 atoms나 selectors에 접근하면 자동으로 종속 관계가 생성되므로, 참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행**된다.

**Selectors는 useRecoilValue() 를 사용해 읽을 수 있다.** useRecoilValue()는 하나의 atom이나 selector를 인자로 받아 대응하는 값을 반환한다. **writable한 selector가 아니면, useRecoilState()를 이용하지 않는다. writable한 selectors를 만들 수도 있다.**
