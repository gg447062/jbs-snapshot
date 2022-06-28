import React, { useState, useEffect } from 'react';
import { useQuery } from 'graphql-hooks';

const OPEN_PROPOSALS = `query Proposals {
  proposals (
    first:10,
    skip:0,
    where: {
      space_in: ["jbdao.eth"],
      state: "active"
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title

  }
}`;

const Proposals = ({ setLoaded }) => {
  const { loading, error, data } = useQuery(OPEN_PROPOSALS);

  useEffect(() => {
    if (data && !loading) {
      setLoaded(true);
    }
  }, [data, loading]);
  return (
    <div className="table-wrapper">
      {error && <div className="message">an error ocurred...</div>}
      {loading && <div className="message">loading...</div>}
      {data && (
        <table>
          <thead>
            <tr>
              <td>JBP</td>
              <td>TITLE</td>
              <td>START DATE</td>
              <td>END DATE</td>
            </tr>
          </thead>

          <tbody>
            {data.proposals.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{el.title.slice(0, 7)}</td>
                  <td>{el.title.slice(10, el.title.length)}</td>
                  <td>{new Date(el.start * 1000).toDateString()}</td>
                  <td>{new Date(el.end * 1000).toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Proposals;
