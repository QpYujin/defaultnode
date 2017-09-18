echo "-----------------------Build Details-----------------------------">gitbuildinfo.txt
echo "Github link :">>gitbuildinfo.txt
git remote -v >>gitbuildinfo.txt
echo "--------------------------------------" >>gitbuildinfo.txt
echo "Branch :" >>gitbuildinfo.txt
git branch >>gitbuildinfo.txt
echo "--------------------------------------" >>gitbuildinfo.txt
echo "Tag :" >>gitbuildinfo.txt
given_tag=$(git describe --tags $(git rev-list --tags --max-count=1))
echo "$given_tag">>gitbuildinfo.txt
echo "--------------------------------------" >>gitbuildinfo.txt
echo "Recent Commits :" >>gitbuildinfo.txt
git show "$given_tag" >>gitbuildinfo.txt
echo "--------------------------------------" >>gitbuildinfo.txt

