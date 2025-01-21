import * as Ably from "ably";

const options: Ably.ClientOptions = {
  key: "HiYSPw.1vBzlQ:D09SYsWI-sGeTicsQhX8xfK_dmnK3iUyn8z0ZpSWMU4",
};
export const ablyClient = new Ably.Realtime(
  options
); /* inferred type Ably.Realtime */
