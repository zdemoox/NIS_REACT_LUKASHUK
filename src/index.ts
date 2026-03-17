// Задание 1
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Person {
  name: string;
  age: number;
  hobbies: string[];
  gender: Gender;
}

export function formatPersonInfo(person: Person): string {
  const genderRu = person.gender === Gender.MALE ? "Мужской" : "Женский";
  const hobbies =
    person.hobbies.length > 0 ? person.hobbies.join(", ") : "—";

  return `${person.name}, ${person.age} лет, любит: ${hobbies}. Пол: ${genderRu}`;
}

// Задание 2
export interface FormData {
  username: string;
  email: string;
  age: number;
}

export type ValidationRules<T extends object> = {
  [K in keyof T]: (value: T[K]) => string | null;
};

export type ValidationErrors<T extends object> = Partial<
  Record<keyof T, string>
>;

export function validateForm(
  data: FormData,
  rules: ValidationRules<FormData>,
): ValidationErrors<FormData> {
  const errors: ValidationErrors<FormData> = {};

  for (const key of Object.keys(rules) as (keyof FormData)[]) {
    const message = (rules[key] as (value: FormData[keyof FormData]) => string | null)(
      data[key],
    );
    if (message) errors[key] = message;
  }

  return errors;
}

export const rules: ValidationRules<FormData> = {
  username: (value) =>
    value.trim().length > 0
      ? null
      : `Поле 'username' не может быть пустым`,
  email: (value) =>
    value.trim().length > 0 ? null : `Поле 'email' не может быть пустым`,
  age: (value) =>
    value > 0 ? null : `Поле 'age' должно быть больше нуля`,
};

// Задание 3
export type ProcessValueResult = string | number | boolean;

export function processValue(value: string | number | boolean): ProcessValueResult {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value * value;
  return !value;
}

const isDirectRun =
  typeof process !== "undefined" &&
  typeof process.argv?.[1] === "string" &&
  /[\\/]src[\\/]index\.ts$/.test(process.argv[1]);

if (isDirectRun) {
  console.log(
    formatPersonInfo({
      name: "Денис",
      age: 25,
      hobbies: ["чтение", "спорт"],
      gender: Gender.MALE,
    }),
  );

  console.log(
    validateForm(
      { username: " ", email: "test@example.com", age: 0 },
      rules,
    ),
  );

  console.log(processValue("hello"), processValue(7), processValue(true));
}

