    <?php

    namespace App\Repositories;

    use App\Interfaces\ColorsInterface;
    use App\Models\Color;
    use App\Traits\HttpResponses;

    class CategoryRepository implements ColorsInterface
    {
        use HttpResponses;

        public function all() {
            return Color::all();
        }

        public function createColor() {}
        public function deleteColor() {}
    }
