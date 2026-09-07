
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Recipe } from "@/types";

interface BasicInfoTabProps {
  nameEn: string;
  setNameEn: (value: string) => void;
  nameNe: string;
  setNameNe: (value: string) => void;
  descriptionEn: string;
  setDescriptionEn: (value: string) => void;
  descriptionNe: string;
  setDescriptionNe: (value: string) => void;
  servings: number;
  setServings: (value: number) => void;
  prepTime: number;
  setPrepTime: (value: number) => void;
  cookTime: number;
  setCookTime: (value: number) => void;
  difficulty: Recipe['difficulty'];
  setDifficulty: (value: Recipe['difficulty']) => void;
  category: Recipe['category'];
  setCategory: (value: Recipe['category']) => void;
}

export const BasicInfoTab = ({
  nameEn, setNameEn, nameNe, setNameNe,
  descriptionEn, setDescriptionEn, descriptionNe, setDescriptionNe,
  servings, setServings, prepTime, setPrepTime, cookTime, setCookTime,
  difficulty, setDifficulty, category, setCategory
}: BasicInfoTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nameEn">Recipe Name (English)</Label>
          <Input
            id="nameEn"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="nameNe">Recipe Name (नेपाली)</Label>
          <Input
            id="nameNe"
            value={nameNe}
            onChange={(e) => setNameNe(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="descriptionEn">Description (English)</Label>
          <Textarea
            id="descriptionEn"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="descriptionNe">Description (नेपाली)</Label>
          <Textarea
            id="descriptionNe"
            value={descriptionNe}
            onChange={(e) => setDescriptionNe(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="servings">Servings</Label>
          <Input
            id="servings"
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="prepTime">Prep (min)</Label>
          <Input
            id="prepTime"
            type="number"
            min="0"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="cookTime">Cook (min)</Label>
          <Input
            id="cookTime"
            type="number"
            min="0"
            value={cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={(value: Recipe['difficulty']) => setDifficulty(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value: Recipe['category']) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dal-bhat">Dal-Bhat</SelectItem>
              <SelectItem value="curry">Curry</SelectItem>
              <SelectItem value="momo">Momo</SelectItem>
              <SelectItem value="achar">Achar</SelectItem>
              <SelectItem value="roti-sabji">Roti-Sabji</SelectItem>
              <SelectItem value="khaja">Khaja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
