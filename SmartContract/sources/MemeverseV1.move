module addr::Memeverse {
    use aptos_framework::coin::Coin;
    use aptos_framework::aptos_account;
    use aptos_framework::string::{String};
    use std::string;
    use aptos_std::table;
    use std::signer;
    use std::vector;

     #[event]
    struct Help_Builders_Event has store, drop {
        project_name: String,
        project_owner: address,
    }

    #[event]
    struct Created_Question_Event has store, drop {
        Question: String,
        
    }

    #[event]
    struct Placed_Bet_Event has store, drop {
        question_id: u64,
        selected_option: bool,
    }

    #[event]
    struct Completed_Question_Event has store, drop {
        question_id: u64,
        selected_option: bool,
        winner_amount: u128,
    }

    #[event]
    struct Message_Event has store, drop {
        sender: address,
        receiver: address,
        message: String,
    }

    #[event]
    struct User_Event has store, drop {
        username: String,
    }

    #[event]
    struct Post_Event has store, drop {
        post_url: String,
        owner: address,
    }

    #[event]
    struct Blog_Event has store, drop {
        post_url: String,
        owner: address,
    }

  

       struct Post has store, copy {
        owner: address,
        post_url: string::String,
        caption: string::String,
        likes: u64,
        tips: u128,
    }

    struct User has store, copy {
        name: string::String,
        username: string::String,
        profile_url: string::String,
        interests: vector<string::String>,
        tokens: u128,
        posts: vector<u64>,
        generations: u64,
        saved_posts: vector<u64>,
        tips: u128,
      }


     struct MainResource has key {
        users: table::Table<address, User>,
        post: table::Table<u64, Post>,
    }

   

    /// Global state variables
    struct GlobalState has key {
        post_index: u64,
        TOKEN_POOL: u128,
    }

    
     fun init_module(owner: &signer) {
        let global_state = GlobalState {
            post_index: 0,
            TOKEN_POOL: 5_000_000_000_000_000,
        };

        move_to(owner, global_state);

         let users_table = table::new<address, User>();
        let post_table = table::new<u64, Post>();

               let resource = MainResource {
            users: users_table,
            post: post_table,
        };
        move_to(owner, resource);
    }


   
    public entry fun buy_token(
        sender: &signer,
        _token : u64,
      
    ) acquires MainResource, GlobalState {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<MainResource>(@addr);
        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let apt_to_charge = _token ; 
let apt_to_charge_u64: u64 = apt_to_charge*10_000_000;
aptos_account::transfer(sender, @addr, apt_to_charge_u64);
        global_state_ref.TOKEN_POOL = global_state_ref.TOKEN_POOL -( _token as u128);
        let user = table::borrow_mut(&mut resource.users, sender_address);
        user.tokens = user.tokens + (_token*100_000_000 as u128);
        
    }

    public entry fun gen_image(
        sender: &signer,
        _charge:u128
    ) acquires MainResource,GlobalState {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<MainResource>(@addr);
        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let user = table::borrow_mut(&mut resource.users, sender_address);
        assert!(user.tokens>=100_000_000*_charge, 3); // Ensure that user has enough tokens for creating a post
        user.tokens = user.tokens - (100_000_000*_charge);
        user.generations = user.generations + 1;
        global_state_ref.TOKEN_POOL = global_state_ref.TOKEN_POOL + (100_000_000*_charge);
    }

    /// Registers a new user
    public entry fun register_user(
        account: &signer, 
        name: string::String, 
        username: string::String, 
        profile_url: string::String, 
        interests: vector<string::String>
    )  acquires MainResource,GlobalState {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<MainResource>(@addr);
    
        


        // update global token
        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _total_token = global_state_ref.TOKEN_POOL;
        global_state_ref.TOKEN_POOL =_total_token + 5_000_000_000;

        let new_user = User {
            name: name,
             username: username,
            profile_url: profile_url,
            interests: interests,
            tokens: 5_000_000_000,
            generations:0,
            posts: vector::empty<u64>(),
            saved_posts: vector::empty<u64>(),
            tips: 0
        };

        // Store user data
        table::add(&mut resource.users, user_address, new_user);

              // Emit event
        let event = User_Event {
        username:username,
        };
        0x1::event::emit(event);
}

    public entry fun create_post(
        account: &signer, 
        _post_url: string::String, 
        _caption: string::String
        
    ) acquires GlobalState, MainResource {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<MainResource>(@addr);

        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _post_index = global_state_ref.post_index;
        global_state_ref.post_index = _post_index + 1;

        
        let user = table::borrow_mut(&mut resource.users, user_address);
        assert!(user.tokens>=200_000_000, 3); // Ensure that user has enough tokens for creating a post
        user.tokens =user.tokens-200_000_000;
         let _global_tokens = global_state_ref.TOKEN_POOL;
        global_state_ref.TOKEN_POOL = _global_tokens+200_000_000;

        let new_post = Post {
            owner: user_address,
            post_url:_post_url,
            caption: _caption,
            likes: 0,
             tips: 0,
        };

        table::add(&mut resource.post, _post_index, new_post);
        vector::push_back(&mut user.posts, _post_index);


        
      // Emit event
    let event = Post_Event {
       post_url: _post_url,
        owner: user_address,
    };
    0x1::event::emit(event);
    }

    public entry fun save_post(
    account: &signer, 
    _post_index: u64
    ) acquires MainResource {
    let user_address = signer::address_of(account);
    let resource = borrow_global_mut<MainResource>(@addr);

    let user = table::borrow_mut(&mut resource.users, user_address);

    // check if the post is already saved 
    let saved_posts_len = vector::length(&user.saved_posts);
    let  i = 0;
    while (i < saved_posts_len) {
        let condition = *vector::borrow(&user.saved_posts, i) == _post_index;
        if (condition) {
            return () // exit the function 
        };
        i = i + 1;
    };

    // Add the post if it's not already saved
    vector::push_back(&mut user.saved_posts, _post_index);
    }

    public entry fun like_post(_user: &signer, _post_id: u64) acquires MainResource {
        let sender_address = signer::address_of(_user);

       let resource = borrow_global_mut<MainResource>(@addr);
        let sender = table::borrow_mut(&mut resource.users, sender_address);
        assert!(sender.tokens>=200_000_000, 3);

       let post = table::borrow_mut(&mut resource.post, _post_id);
        post.likes = post.likes + 1;

        sender.tokens =sender.tokens-200_000_000;
        let _receiver_address = post.owner;
        let receiver = table::borrow_mut(&mut resource.users, _receiver_address);
        receiver.tokens =receiver.tokens+200_000_000  ;

        receiver.tips = receiver.tips + 200_000_000;

    }

    /// Allows a user to tip another user
    public entry fun tip_user(_sender: &signer, _receiver_address: address, _no_of_tokens: u128) acquires MainResource {
        let sender_address = signer::address_of(_sender);
        let resource = borrow_global_mut<MainResource>(@addr);

        let sender = table::borrow_mut(&mut resource.users, sender_address);

        assert!(sender.tokens>=_no_of_tokens*100_000_000, 3); //ensure sender has enough tokens

        sender.tokens =sender.tokens-_no_of_tokens*100_000_000;

        

        let receiver = table::borrow_mut(&mut resource.users, _receiver_address);
        receiver.tokens =receiver.tokens+_no_of_tokens*100_000_000  ;

        receiver.tips = receiver.tips + _no_of_tokens*100_000_000;
    }

    #[view]
    public fun get_user_profile(user_address: address): User acquires MainResource {
        let resource = borrow_global<MainResource>(@addr);
        *table::borrow(&resource.users, user_address)
    }

    #[view]
    public fun view_post_detail(post_id: u64): Post acquires MainResource {
       let resource = borrow_global<MainResource>(@addr);
        *table::borrow(&resource.post, post_id)
    }
       #[view]
    public fun view_all_posts(): vector<addr::Memeverse::Post> acquires MainResource,GlobalState {
        let resource = borrow_global<MainResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let _post_index = global_state_ref.post_index;
        let  all_posts = vector::empty<addr::Memeverse::Post>();
        let  i = 0;
        while (i < _post_index) {
            let temp = *table::borrow(&resource.post, i);
            vector::push_back(&mut all_posts, temp);
            i = i + 1;
        };
        all_posts
    }

  

     #[view]
    public fun is_user_registered(user_address: address): bool acquires MainResource {
        let resource = borrow_global<MainResource>(@addr);
        table::contains(&resource.users, user_address)
    }

    #[view]
    public fun get_user_token (user_address: address): u128 acquires MainResource {
        let resource = borrow_global<MainResource>(@addr);
        let user = table::borrow(&resource.users, user_address);
        let toke:u128= user.tokens;
        toke
    }

}