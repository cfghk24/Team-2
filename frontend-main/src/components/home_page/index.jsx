import PostingCard from "./postingCard";
const Dashboard = () => {
    // Sample posts data with working image URLs
    const posts = [
      {
        profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
        userName: "Alice Smith",
        timePosted: "1 hour ago",
        content: "Just adopted this little pup! Isn't she adorable?",
        likes: "10",
        postImg: "data:image/jpeg;base64,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", // Puppy image
      },
      {
        profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
        userName: "John Doe",
        timePosted: "2 hours ago",
        content: "My dog is living her best life!",
        likes: "2",
        postImg: "https://wellbeloved.com/cdn/shop/articles/do-you-have-a-hyperactive-puppy-understanding-puppy-energy-levels-james-wellbeloved-uk.jpg?v=1681891302", // Cat image
      },
      {
        profileImg: "https://randomuser.me/api/portraits/women/44.jpg",
        userName: "Emily Davis",
        timePosted: "3 hours ago",
        content: "Walked the cats this morning, such a beautiful day!",
        likes: "32",
        postImg: "data:image/jpeg;base64,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", // Dog walking image
      },
      {
        profileImg: "https://randomuser.me/api/portraits/men/67.jpg",
        userName: "Michael Johnson",
        timePosted: "4 hours ago",
        content: "My cat loves the snow! Look at him having fun!",
        likes: "7",
        postImg: "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", // Dog in snow image
      },
    ];

    const recommendations = [
      {
        name: "Paws & Plates",
        address: "123 Bark St, Dogtown",
        rating: 4.5,
        description: "A cozy place where you and your furry friend can enjoy delicious meals together.",
      },
      {
        name: "Furry Feast",
        address: "456 Meow Ave, Cat City",
        rating: 4.7,
        description: "A pet-friendly restaurant offering a variety of dishes for both humans and pets.",
      },
      {
        name: "Pet Palate",
        address: "789 Woof Rd, Petville",
        rating: 4.6,
        description: "A perfect spot for pet lovers to dine with their pets in a friendly environment.",
      },
    ];
    
    const styles = {
      heading: {
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      },
      tableHeaderRow: {
        backgroundColor: '#4CAF50',
        color: 'white',
        textAlign: 'left',
      },
      tableHeader: {
        padding: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        color: '#333',
      },
      evenRow: {
        backgroundColor: '#f9f9f9',
      },
      oddRow: {
        backgroundColor: '#fff',
      },
      hoverRow: {
        backgroundColor: '#f1f1f1',
      },
    };
    const styles_feed = {

 
        heading: {
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333',
        },
        postingContainer: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',  // Ensures PostingCards are stacked vertically
          gap: '20px',
          marginTop: '20px',
          width: '100%',            // Allow it to take up full width
          maxWidth: '800px',        // Maximum width for the entire container
          marginLeft: 'auto',       // Center horizontally
          marginRight: 'auto',
        },
        postingCardWrapper: {
          width: '100%',            // Make sure each posting card takes the full available width
          flexShrink: 0,            // Prevent the cards from shrinking
          maxWidth: '600px',        // Optional: Set a maximum width for the posting cards
        },
      };
      
    
    
    // Add hover effect for table rows
    styles.tableCell = {
      ...styles.tableCell,
      transition: 'background-color 0.3s ease',
    };
    
    // Add hover effect to rows
    styles.tableRow = {
      ...styles.tableRow,
      '&:hover': {
        backgroundColor: styles.hoverRow.backgroundColor,
      },
    };
    
  return (
    <>
      <div style={{ marginTop: '30px' }}>
      <h2 style={styles.heading}>Pet-Friendly Restaurant Recommendations</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Address</th>
            <th style={styles.tableHeader}>Rating</th>
            <th style={styles.tableHeader}>Description</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.tableCell}>{rec.name}</td>
              <td style={styles.tableCell}>{rec.address}</td>
              <td style={styles.tableCell}>{rec.rating}</td>
              <td style={styles.tableCell}>{rec.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    {/* Task chart & Calendar */}
    <div style={{ marginTop: '30px' }}>
    <h2 style={styles.heading}>Your Feed</h2>
{/* Posting Card - Add the PostingCard component here */}
<div style={styles_feed.postingContainer}>
  {posts.map((post, index) => (
    <PostingCard
      key={index}
      profileImg={post.profileImg}
      userName={post.userName}
      timePosted={post.timePosted}
      content={post.content}
      postImg={post.postImg}
      initialLikes = {post.likes}
    />
  ))}
</div>
</div>

<div style={{ marginTop: '30px' }}>
  <button>Load More</button>
</div>

   
        
    </>
  );
};

export default Dashboard;
