import type {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  SyntheticEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import { useSetLocale, useTranslate } from "./translate";

interface User {
  id: string;
  name: string;
}

function App() {
  // useState는 initialValue를 통해서 타입추론을 하기 때문에,
  // initialValue만 잘 작성해줘도 타입 작성을 할 필요가 없다.
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);

  // 외부에서 데이터를 가져와야 하는 경우, null로 초기화를 해야하기 때문에 직접 타입을 작성해야 한다.
  const [user, setUser] = useState<User | null>(null);

  // 배열 데이터는 타입 추론을 통해 아이템 타입을 확인하기 어렵기 때문에 직접 타입을 작성해야 한다.
  // 빈배열을 통해 추론되는 never 타입을 TS에서 아무타입도 아니라는 뜻이기 때문에 반드시 타입을 명시해줘야 한다. (기능을 못함)
  const [arr, setArr] = useState<string[]>([]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const t = useTranslate();
  const setLocale = useSetLocale();

  useEffect(() => {
    const form = formRef.current;
    // 타입가드
    if (form) form["username"].focus();
  }, []);

  // React Event의 T 기본값은 Element
  // Element에는 name과 value 속성이 없음 (에러 발생)
  // 따라서 T 자리에 HTMLInputElement 타입을 명시적으로 할당
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
  }

  // 혹은 함수 타입을 바로 잡아서 이벤트 타입을 잡히게 할수도 있음
  const handleChange2: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
  };

  // HTML DOM에서의 이벤트 타입: MouseEvent -> UIEvnet -> Event
  // React에서의 이벤트 타입: MouseEvent -> UIEvent -> "SyntheticEvent -> BaseSyntheticEvent"
  // - 크로스 브라우징 일관성 처리, 성능 최적화, 타입 안정성 (generic 사용)
  function handleClick2(e: MouseEvent) {}

  function handleClick(e: SyntheticEvent) {
    e.preventDefault();

    const message = `${values.username}님 환영합니다`;
    alert(message);
  }

  return (
    <form className="login" ref={formRef}>
      <h1 className="login-title">{t("signin")}</h1>

      {/* 요소를 만들어놓고 handler와 event 타입을 확인 */}
      <input type="text" onChange={(e) => {}} />

      <Label>{t("username")}</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder={t("email or phone number")}
        value={values.username}
        onChange={handleChange}
      />
      <Label>{t("password")}</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder={t("password")}
        value={values.password}
        onChange={handleChange}
      />
      <div className="login-forgot">
        <a className="login-forgot-link" href="#login">
          {t("forgot your password?")}
        </a>
      </div>
      <Button id="submit" onClick={handleClick} type="default">
        {t("signin")}
      </Button>
      <div className="login-signup">
        {t("new user?")}{" "}
        <a className="login-signup-link" href="#signup">
          {t("signup")}
        </a>
      </div>
      <div className="locale">
        <span onClick={() => setLocale("ko")}>한국어</span> |{" "}
        <span onClick={() => setLocale("en")}>English</span>
      </div>
    </form>
  );
}

export default App;
