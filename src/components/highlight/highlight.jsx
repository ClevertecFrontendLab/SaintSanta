import { Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

import './highlight.scss';

export const HighLight = ({ inputText, title }) => {
  if (!inputText) {
    return <span>{title}</span>;
  }

  const regexp = new RegExp(inputText, 'gi');
  const matchValue = title.match(regexp);

  if (matchValue) {
    return (
      <Fragment>
        {title.split(regexp).map((str, index, array) => {
          if (index < array.length - 1) {
            const firstMatch = matchValue.shift();

            return (
              <Fragment key={uuidv4()}>
                {str}
                <mark data-test-id='highlight-matches'>{firstMatch}</mark>
              </Fragment>
            );
          }

          return <Fragment key={uuidv4()}>{str}</Fragment>;
        })}
      </Fragment>
    );
  }

  return <span>{title}</span>;
};
