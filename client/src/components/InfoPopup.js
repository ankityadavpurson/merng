const { Popup } = require("semantic-ui-react");

const InfoPopup = ({ content, children }) => (
  <Popup content={content} inverted trigger={children} />
);

export default InfoPopup;
