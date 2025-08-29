function generateUserId(fullName, birthDate) {
    const formattedName = fullName.toLowerCase().replace(/\s+/g, '_');
    
    const day = String(birthDate.getDate()).padStart(2, '0');
    const month = String(birthDate.getMonth() + 1).padStart(2, '0');
    const year = birthDate.getFullYear();
    
    const formattedDate = `${day}${month}${year}`;
    
    return `${formattedName}_${formattedDate}`;
}

function getUserInfo() {
    const fullName = "John Doe";
    const birthDate = new Date(2000, 0, 15);
    
    return {
        user_id: generateUserId(fullName, birthDate),
        email: "john.doe@example.com",
        roll_number: "ABCD123"
    };
}

module.exports = {
    generateUserId,
    getUserInfo
};