import ReadingList from '../../pages/ReadingList';

// item.data is the category key chosen in the XMB reading menu (Current/Wishlist/…).
function ReadingDetail({ item }) {
  return <ReadingList category={item.data} />;
}

export default ReadingDetail;
