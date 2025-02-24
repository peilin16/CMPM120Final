class  dataRecord{

    constructor() {
        // Divine Spirit
        this.blueDivineSpirit_height = 35;
        this.blueDivineSpirit_width = 20;
        this.blueDivineSpirit_speed = -2.5;

        // Kedama
        this.kedama_height = 45;
        this.kedama_width = 45;
        this.kedama_speed = -2;
        // Fairy
        this.sunflowerFairy_height = 75;
        this.sunflowerFairy_width = 70;
        this.sunflowerFairy_speed = -2;

        this.dandelionFairy_height = 75;
        this.dandelionFairy_width = 70;
        this.dandelionFairy_speed = -2;

        // Rumia (Player)
        this.rumia_height = 44;
        this.rumia_width = 44;
        this.rumia_speed = 3.5;
        this.rumia_defense_radius = 52;

        // Default Bullet
        this.bullet_speed = 4.0;
        
    }

    // ✅ Get sprite data dynamically
    getData(type) {
        return this[type] || null; // Return value or null if not found
    }





    
}