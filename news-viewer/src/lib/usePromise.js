import { useState, useEffect } from "react";

export default function usePromise(promiseCreater, deps) {
  //대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreater();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}