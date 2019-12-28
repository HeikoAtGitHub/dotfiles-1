import getSpacesForDisplay from './lib/getSpacesForDisplay';
import {css, run} from 'uebersicht';
import {defaultTheme} from './lib/style';

export const initialState = [];

export const updateState = (event, state) => {
  switch (event.type) {
    case 'SPACES_UPDATED':
      return event.spaces;
  }
  return state;
};

export const command = dispatch =>
  getSpacesForDisplay(1).then(spaces =>
    dispatch({
      type: 'SPACES_UPDATED',
      spaces,
    }),
  );

export const refreshFrequency = false;

export const className = `
  ${defaultTheme}
  align-items: center;
  display: flex;
  display: inline-flex;
  justify-content: space-between;
  justify-content: space-between;
  margin-right: 10px;
  margin: 0;
  order: 1;
  padding: 0;
  position: static;
  vertical-align: top;
  div:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  div:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const spaceClass = css`
  cusor: pointer;
  padding: 0 2ch;
  position: relative;
`;

const spaceFocusedClass = css`
  ${spaceClass}
  background-color: #D8DEE9;
  color: #2E3440;
  font-weight: bold;
`;

const indexClass = css`
  font-size: 9px;
  height: 12px;
  line-height: 12px;
  position: absolute;
  right: 5px;
  top: 1px;
`;

function onClick(dispatch, spaces, space) {
  if (space.focused) {
    return;
  }

  run(`yabai -m space --focus ${space.index}`);

  // Optimistic update
  dispatch({
    type: 'SPACES_UPDATED',
    spaces: spaces.map(s => ({...s, focused: space.index === s.index})),
  });
}

const Space = ({spaces, space, dispatch}) => (
  <div
    key={space.index}
    className={space.focused ? spaceFocusedClass : spaceClass}
    onClick={() => onClick(dispatch, spaces, space)}
    onMouseOver={() => onClick(dispatch, spaces, space)}>
    {space.label ? space.label : space.index}
    {space.label && <span className={indexClass}>{space.index}</span>}
  </div>
);

export const render = (spaces, dispatch) =>
  spaces.map(space => (
    <Space spaces={spaces} space={space} dispatch={dispatch} />
  ));
