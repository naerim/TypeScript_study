/*
    🌙 유니언 타입 (Union Types)
    유니언 타입은 여러 타입 중 하나가 될 수 있는 값을 의미한다.
    세로 막대 (|)로 각 타입을 구분하여, number | string | boolean은 값의 타입이 number, string 혹은 boolean이 될 수 있음을 의미한다.

     * 문자열을 받고 왼쪽에 "padding"을 추가합니다.
     * 만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 더해질 것입니다.
     * 만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 더해질 것입니다.

    function padLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
        return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }

    let indentedString = padLeft("Hello world", true);


    🌙 공통 필드를 갖는 유니언 (Unions with Common Fields)
    유니언 타입인 값이 있으면, 유니언에 있는 모든 타입에 공통인 멤버들에만 접근할 수 있다.

    interface Bird {
      fly(): void;
      layEggs(): void;
    }

    interface Fish {
      swim(): void;
      layEggs(): void;
    }

    declare function getSmallPet(): Fish | Bird;

    let pet = getSmallPet();
    pet.layEggs();

    // 두 개의 잠재적인 타입 중 하나에서만 사용할 수 있습니다.
    pet.swim();

    만약 값이 A | B 타입을 갖고 있으면, 확신할 수 있는 것은 그 값이 A와B 둘 다 가지고 있는 멤버들을 갖고 있다는 것뿐이다.
    이 예제에서, Bird는 fly라는 멤버를 갖고 있다. 하지만 Bird | Fish로 타입이 지정된 변수가 fly 메서드를 가지고 있는지 확신할 수 없다.
    만약 변수가 런타임에서 Fish이면, pet.fly()를 호출하는 것은 오류가 난다.


    🌙 유니언 구별하기 (Discriminating Unions)
    유니언을 사용하는 데 있어서 일반적인 기술은 TypeScript가 현재 가능한 타입 추론의 범위를 좁혀나가게 해줄 수 있는 리터럴 타입을 갖는 단일 필드를 사용하는 것이다.
    예를 들어, 하나의 공통 필드를 가지고 있는 세 가지 타입의 유니언을 만들어 보겠다.

    type NetworkLoadingState = {
      state: "loading";
    };

    type NetworkFailedState = {
      state: "failed";
      code: number;
    };

    type NetworkSuccessState = {
      state: "success";
      response: {
        title: string;
        duration: number;
        summary: string;
      };
    };

    // 위 타입들 중 단 하나를 대표하는 타입을 만들었지만,
    // 그것이 무엇에 해당하는지 아직 확실하지 않습니다.
    type NetworkState =
      | NetworkLoadingState
      | NetworkFailedState
      | NetworkSuccessState;

    위 타입들은 모두 state라는 필드를 갖고 있으며, 그들 각자만의 필드도 갖고 있다.
    state 필드가 NetworkState 안의 모든 타입에 공통으로 존재한다는 점을 안다면 존재 여부를 체크하지 않고도 접근할 수 있다.
    리터럴 타입으로서 state를 갖고 있다면, state의 값은 대응하는 동일한 문자열과 대조되고 TypeScript는 현재 어떤 타입이 사용되고 있는지 알 것이다/
    이 경우, 런타임에 나타나는 타입의 범위를 좁히기 위하여 switch문을 사용할 수 있디.

    type NetworkLoadingState = {
      state: "loading";
    };

    type NetworkFailedState = {
      state: "failed";
      code: number;
    };

    type NetworkSuccessState = {
      state: "success";
      response: {
        title: string;
        duration: number;
        summary: string;
      };
    };
    // ---생략---
    type NetworkState =
      | NetworkLoadingState
      | NetworkFailedState
      | NetworkSuccessState;

    function networkStatus(state: NetworkState): string {
      // 현재 TypeScript는 셋 중 어떤 것이
      // state가 될 수 있는 잠재적인 타입인지 알 수 없습니다.

      // 모든 타입에 공유되지 않는 프로퍼티에 접근하려는 시도는
      // 오류를 발생시킵니다.
      state.code;

      // state에 swtich문을 사용하여, TypeScript는 코드 흐름을 분석하면서
      // 유니언 타입을 좁혀나갈 수 있습니다.
      switch (state.state) {
        case "loading":
          return "Downloading...";
        case "failed":
          // 여기서 타입은 NetworkFailedState일 것이며,
          // 따라서 `code` 필드에 접근할 수 있습니다.
          return `Error ${state.code} downloading`;
        case "success":
          return `Downloaded ${state.response.title} - ${state.response.summary}`;
      }
    }


    🌙 교차 타입 (Intersection Types)
    교차 타입은 유니언 타입과 밀접한 관련이 있지만 사용 방법은 매우 다르다.
    교차 타입은 여러 타입을 하나로 결합한다.
    기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있따.
    예를 들어, Person & Serializable & Loggable은 Person 과 Serializable 그리고 Loggable이다. 즉, 이 타입의 객체는 세 가지 타입의 모든 멤버를 갖게 되는 것이다.

    또한, 일관된 에러를 다루는 여러 네트워크 요청이 있다면 해당 에러 핸들링을 분리하여 하나의 응답 타입에 대응하는 결합된 자체 타입으로 만들 수 있다.
    interface ErrorHandling {
      success: boolean;
      error?: { message: string };
    }

    interface ArtworksData {
      artworks: { title: string }[];
    }

    interface ArtistsData {
      artists: { name: string }[];
    }

    // 이 인터페이스들은
    // 하나의 에러 핸들링과 자체 데이터로 구성됩니다.

    type ArtworksResponse = ArtworksData & ErrorHandling;
    type ArtistsResponse = ArtistsData & ErrorHandling;

    const handleArtistsResponse = (response: ArtistsResponse) => {
      if (response.error) {
        console.error(response.error.message);
        return;
      }

      console.log(response.artists);
    };
*/