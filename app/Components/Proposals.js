import React from 'react';
import { useQuery } from 'graphql-hooks';

const PROPSALS_QUERY = `query Proposals {
  proposals (
    first: 11,
    skip: 0,
    where: {
      space_in: ["jbdao.eth"],
      state: "active"
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title

    start
    end
    snapshot

  }
}`;

const Proposals = () => {
  const { loading, error, data } = useQuery(PROPSALS_QUERY);
  if (loading) return 'loading...';
  if (error) return 'an error occured';

  return (
    <div className="table-wrapper">
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
    </div>
  );
};

export default Proposals;
