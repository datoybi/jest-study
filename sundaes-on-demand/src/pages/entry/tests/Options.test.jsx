import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  // findAllByRole을 사용해야한다! 비동기로 img를 가져오니까!!(중요)
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // find the scoops subtotal, which starts out at 0
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });

  // expect input to be invalid with negative number
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // do the same test for 100
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // do the same test for -1
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopSubtotal).toHaveTextContent("0.00");
});
