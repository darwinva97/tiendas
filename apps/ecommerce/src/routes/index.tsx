import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { QButton } from "~/integrations/react/ui";
import { getSession } from "~/hooks";

export const useSessionLoader = routeLoader$(getSession);

export default component$(() => {
  const session = useSessionLoader();
  return (
    <>
      <h1>Hi 👋</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <QButton>AEA</QButton>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
