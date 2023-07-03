import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("유효하지 않은 값 입력시 input값이 빨간색으로 변하는지 check", async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  // expect input to be invalid with negative number
  const vanillaInput = await screen.findByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with input that's too high
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with valid input
  // note: 우리는 리엑트 부트스트랩이 잘 작동하는지를 test 하는게 아니라,
  // 입력값이 유효하지 않으면 빨간색 테두리가 생기는지를 테스트 하는 것입니다!
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
