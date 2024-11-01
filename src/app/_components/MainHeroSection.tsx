"use client";

import Link from "next/link";
import {useState, useEffect} from "react";

// components
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {FormField, FormLabel, FormControl, FormMessage, Form, FormItem} from "@/components/ui/form";

// schema
import {recommendTrendSchema, recommendTrendSchemaType} from "@/service/schema/recommend.schema";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const CustomizationForm = ({onSubmit}: {onSubmit: () => void}) => {
  const recommendTrendForm = useForm<recommendTrendSchemaType>({
    resolver: zodResolver(recommendTrendSchema),
    defaultValues: {
      age: "",
      gender: "",
      category: "",
      keyword: "",
    },
  });

  return (
    <Form {...recommendTrendForm}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="age"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  연령대를 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10s">10대</SelectItem>
                      <SelectItem value="20s">20대</SelectItem>
                      <SelectItem value="30s">30대</SelectItem>
                      <SelectItem value="40s">40대 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  성별을 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  카테고리를 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000001">패션/잡화</SelectItem>
                      <SelectItem value="50000002">화장품/미용</SelectItem>
                      <SelectItem value="50000008">패션/의류</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={recommendTrendForm.control}
          name="keyword"
          render={({field}) => (
            <FormItem className="space-y-2 pb-4">
              <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                찾고싶은 키워드를 입력해주세요.
              </FormLabel>
              <FormControl>
                <Input {...field} id="name" placeholder="이름" required maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          맞춤 추천 받기
        </Button>
      </form>
    </Form>
  );
};

export default function MainHeroSection() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCustomizationSubmit = () => {
    setOpen(false);
    // 여기에 맞춤 추천 로직을 추가할 수 있습니다.
  };

  return (
    <section className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
        날씨, 스타일, 성공적.
      </h2>
      <p className="text-lg md:text-xl text-foreground my-6">
        날씨에 맞는 패션이
        <br className="md:hidden" /> 하입한 스타일의 완성입니다.
      </p>
      <div className="flex justify-center gap-6">
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">맞춤 트랜드 보기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>맞춤 트랜드를 위한 정보</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                로그인을 하면 더욱 간편하게 정보를 볼 수 있어요.비로그인 횟수 안내 툴팁
              </DialogDescription>
              <CustomizationForm onSubmit={handleCustomizationSubmit} />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">맞춤 트랜드 보기</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>맞춤 트랜드를 위한 정보</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription>
                로그인을 하면 더욱 간편하게 정보를 볼 수 있어요.
              </DrawerDescription>
              <div className="px-4 py-2">
                <CustomizationForm onSubmit={handleCustomizationSubmit} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <Button asChild>
          <Link href="/products/recommend">맞춤 추천 받기</Link>
        </Button>
      </div>
    </section>
  );
}
