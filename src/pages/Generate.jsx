import {useLoaderData, useSubmit} from "react-router-dom";
import {useEffect} from "react";

const Generate = () => {
  const { tournament } = useLoaderData();
  const submit = useSubmit();
  
  useEffect(() => {
    if (tournament) {
      const toSend = encodeURI(JSON.stringify(tournament));
      submit(null, {method: 'post', encType: 'application/json', action: `/generate?tournament=${toSend}`});
    }
  }, [submit]);
  
  return tournament ? '' : '';
}

export default Generate;